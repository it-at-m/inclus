import React, { FC, useContext, useState } from "react";
import {
  EditorDispatchContext,
  EditorStateContext,
} from "../context/EditorContext";
import { EditorState, FieldValue, Place, SetFieldFunction } from "../types";
import {
  SAVE_UPDATED_PLACE_ACTION,
  SET_EDITED_PLACE_ACTION,
} from "../context/actions";
import Editor from "./editor/Editor";

type PlaceRowProperties = {
  place: Place;
};
const PlaceRow: FC<PlaceRowProperties> = ({ place }) => {
  const { editedPlace } = useContext(EditorStateContext) as EditorState;

  const [currentPlace, setCurrentPlace] = useState<Place>(place);

  const setValue = <K extends keyof Place>(key: K, value: Place[K]) => {
    let _place: Place = Object.assign({}, place);
    _place[key] = value;
    return _place;
  };

  const setField: SetFieldFunction = (
    fieldName: string,
    fieldValue: FieldValue
  ) => {
    const updatedPlace: Place = setValue(fieldName as keyof Place, fieldValue);
    setCurrentPlace(updatedPlace);
  };

  const dispatch = useContext(EditorDispatchContext);

  const saveUpdatedPlace = () => {
    dispatch({
      type: SAVE_UPDATED_PLACE_ACTION,
      payload: {
        updatedPlace: currentPlace,
      },
    });
  };

  return (
    <div key={place.id}>
      <div className="placeRowHeader">
        <div
          className="placeName"
          onClick={() => {
            dispatch({
              type: SET_EDITED_PLACE_ACTION,
              payload:
                editedPlace && editedPlace.id === place.id
                  ? { place: null }
                  : { place },
            });
            setCurrentPlace(place);
          }}
        >
          {place.title}
        </div>

        {editedPlace && currentPlace && editedPlace.id === currentPlace.id && (
          <div>
            <button
              className="placeHeaderButton"
              onClick={() => {
                saveUpdatedPlace();
                dispatch({
                  type: SET_EDITED_PLACE_ACTION,
                  payload: { place: null },
                });
              }}
            >
              Save
            </button>
          </div>
        )}
      </div>

      {editedPlace && currentPlace && editedPlace.id === currentPlace.id && (
        <Editor
          place={currentPlace}
          setField={setField}
          saveUpdatedPlace={saveUpdatedPlace}
        />
      )}
    </div>
  );
};

export default PlaceRow;
