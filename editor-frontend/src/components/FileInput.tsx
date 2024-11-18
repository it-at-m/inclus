import React, {
  ChangeEvent,
  ChangeEventHandler,
  RefObject,
  useContext,
  useRef,
} from "react";
import { saveAs } from "file-saver";
import {
  EditorDispatchContext,
  EditorStateContext,
} from "../context/EditorContext";
import { EditorState } from "../types";
import { SET_FILENAME_ACTION, SET_PLACES_ACTION } from "../context/actions";

const FileInput = () => {
  const { places, fileName } = useContext(EditorStateContext) as EditorState;
  const dispatch = useContext(EditorDispatchContext);

  const hiddenFileInput: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  const handleFileInput: ChangeEventHandler<HTMLInputElement> = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const json = JSON.parse(await file.text());

      dispatch({
        type: SET_PLACES_ACTION,
        payload: { places: json },
      });

      dispatch({
        type: SET_FILENAME_ACTION,
        payload: { fileName: file.name },
      });
    }
  };

  const handleChooseFile = () => {
    if (hiddenFileInput && hiddenFileInput.current)
      hiddenFileInput.current.click();
  };

  const handleDownloadLiveData = () => {
    fetch("https://inclus.de/data/cache-munich.json")
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: SET_PLACES_ACTION,
          payload: { places: json },
        });

        dispatch({
          type: SET_FILENAME_ACTION,
          payload: { fileName: "inclus.de/data/cache-munich.json" },
        });
      });
  };

  const saveUpdatedJSON = () => {
    const data = JSON.stringify(places, null, "\t");
    const fileToSave = new Blob([data], {
      type: "application/json",
    });
    saveAs(fileToSave, fileName);
  };

  return (
    <div className="fileUploadContainer">
      <button className="fileUploadButton" onClick={handleChooseFile}>
        Choose JSON file
      </button>
      or&ensp;
      <button className="fileUploadButton" onClick={handleDownloadLiveData}>
        Download live data
      </button>
      <input
        type="file"
        id="file-upload"
        accept=".json"
        ref={hiddenFileInput}
        onChange={handleFileInput}
      />
      {places.length > 0 && (
        <p>
          uploaded {fileName} and {places.length} places parsed
        </p>
      )}
      {places.length > 0 && (
        <button className="fileDownloadButton" onClick={saveUpdatedJSON}>
          download updated json
        </button>
      )}
    </div>
  );
};

export default FileInput;
