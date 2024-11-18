import { EditorState, Place } from "../types";
import {
  SAVE_UPDATED_PLACE_ACTION,
  SET_EDITED_PLACE_ACTION,
  SET_FILENAME_ACTION,
  SET_FILTER_STRING_ACTION,
  SET_PLACES_ACTION,
} from "./actions";
import { filterPlaces } from "../utils";

export const initialState: EditorState = {
  places: [],
  filterString: "",
  filteredPlaces: [],
  editedPlace: null,
  fileName: "",
};

export const editorReducer = (state: EditorState, action: any): EditorState => {
  const { type, payload } = action;

  switch (type) {
    case SET_PLACES_ACTION: {
      let filtered = payload.places;
      if (state.filterString) {
        filtered = state.places.filter(
          (place: any) =>
            place.title
              .toLowerCase()
              .indexOf(state.filterString.toLowerCase()) !== -1
        );
      }
      return { ...state, places: payload.places, filteredPlaces: filtered };
    }

    case SET_FILENAME_ACTION: {
      return { ...state, fileName: payload.fileName };
    }

    case SET_FILTER_STRING_ACTION: {
      const { filterString } = payload;
      const filtered = filterPlaces(filterString, state.places);
      return { ...state, filteredPlaces: filtered, filterString };
    }

    case SET_EDITED_PLACE_ACTION: {
      return { ...state, editedPlace: payload.place };
    }

    case SAVE_UPDATED_PLACE_ACTION: {
      const { updatedPlace } = payload;

      const placeToUpdateIndex = state.places.findIndex((cplace: Place) => {
        return cplace.id === updatedPlace.id;
      });
      const updatedPlaces = [
        ...state.places.slice(0, placeToUpdateIndex),
        updatedPlace,
        ...state.places.slice(placeToUpdateIndex + 1),
      ];

      const filtered = filterPlaces(state.filterString, updatedPlaces);

      return {
        ...state,
        places: updatedPlaces,
        filteredPlaces: filtered,
      };
    }

    default:
      return state;
  }
};
