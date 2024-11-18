import React, { ChangeEventHandler, useContext } from "react";
import {
  EditorDispatchContext,
  EditorStateContext,
} from "../context/EditorContext";
import { EditorState } from "../types";
import { SET_FILTER_STRING_ACTION } from "../context/actions";

const PlacesFilter = () => {
  const { filterString } = useContext(EditorStateContext) as EditorState;

  const dispatch = useContext(EditorDispatchContext);

  const updateFilterString: ChangeEventHandler<HTMLInputElement> = (ev) => {
    dispatch({
      type: SET_FILTER_STRING_ACTION,
      payload: {
        filterString: ev.target.value,
      },
    });
  };

  return (
    <div className="filterInput">
      <p>find a place: </p>
      <input
        className="filterText"
        type="text"
        value={filterString}
        onChange={updateFilterString}
      />
    </div>
  );
};

export default PlacesFilter;
