import React, {
  ChangeEvent,
  ChangeEventHandler,
  RefObject,
  useRef,
  useState,
} from "react";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { computeClosestPoints, createPlaceFromCSVLine } from "./utils";
import { mappings } from "./mappings/cbfImport";
import { Place } from "../types";

const numberOfClosestToilets = 3;

const ImportPage = () => {
  const [numberOfPlaces, setNumberOfPlaces] = useState(0);
  const hiddenFileInput: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  const [notifications, setNotifications] = useState<Array<any>>([]);

  const handleFileInput: ChangeEventHandler<HTMLInputElement> = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setLoading(true);

      Papa.parse(file, {
        complete: async function (results) {
          setLoading(false);

          const newPlaces: Array<Place> = [];

          const allNotifications: Array<any> = [];

          for (let i = 1; i < results.data.length; i++) {
            // first csv row contains headers
            const rawPlace: Array<any> = results.data[i] as Array<any>;

            let parserNotifications: any = {};
            if (rawPlace.length > 1) {
              const parsingResult = await createPlaceFromCSVLine(
                rawPlace,
                // for now we only have one type of import from cbf, if we get various csv formats,
                // the mappings object should be chosen based on the header list
                // (compare the headers received and choose the right mappings from available)
                mappings
              );

              if (
                parsingResult.errors.length > 0 ||
                parsingResult.warnings.length > 0
              ) {
                parserNotifications.place = parsingResult.place.title;
                parserNotifications.placeId = parsingResult.place.id;
                parserNotifications.errors = parsingResult.errors;
                parserNotifications.warnings = parsingResult.warnings;
                allNotifications.push(parserNotifications);
              }

              if (parsingResult.errors.length === 0)
                newPlaces.push(parsingResult.place as Place); // it is safe type conversion here, because we know that if there were no errors Place object was constructed complete from csvLine, but I'd like a more  robust check here
            }
          }

          for (const point of newPlaces) {
            const closestPoints = computeClosestPoints(
              newPlaces,
              point,
              numberOfClosestToilets
            );

            point["closest_toilets"] = closestPoints.map((cp) => ({
              id: cp.point.id,
              distance: Math.round(cp.distance),
            }));
          }

          let updatedJSON = JSON.stringify(newPlaces, null, 2);

          // TODO: remove this completely, only pass strings through json as should be
          const regex = /"(-|)([0-9]+(?:\.[0-9]+)?)"/g;
          updatedJSON = updatedJSON.replace(regex, "$1$2");

          const fileToSave = new Blob([updatedJSON], {
            type: "application/json",
          });

          setNumberOfPlaces(newPlaces.length);
          setNotifications(allNotifications);
          saveAs(fileToSave, "cache-munich.json");
        },
      });
    }
  };

  const handleChooseFile = () => {
    if (hiddenFileInput && hiddenFileInput.current)
      hiddenFileInput.current.click();
  };

  return (
    <div>
      <h3>Import new data</h3>
      <button className="fileUploadButton" onClick={handleChooseFile}>
        {loading ? "..." : "Choose CSV file"}
      </button>
      <input
        type="file"
        ref={hiddenFileInput}
        accept=".csv"
        onChange={handleFileInput}
      />
      {numberOfPlaces !== 0 && (
        <span>
          {numberOfPlaces} toilets imported, {notifications.length} toilets
          contain errors or warnings.
        </span>
      )}
      {notifications.map((notification) => {
        return (
          <div key={notification.placeId}>
            <h4>{notification.place}</h4>
            <h5>
              {notification.errors.length > 0 &&
                "Object not imported due to errors"}
            </h5>
            {notification.errors.map((error: string, index: number) => (
              <p key={notification.placeId + "_errors_" + index}>{error}</p>
            ))}
            <h5>
              {notification.warnings.length > 0 &&
                (notification.errors.length > 0
                  ? "Warnings"
                  : "Object imported with warnings")}
            </h5>
            {notification.warnings.map((warning: string, index: number) => (
              <p key={notification.placeId + "_warnings_" + index}>{warning}</p>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default ImportPage;
