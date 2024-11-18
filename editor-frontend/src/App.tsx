import { useReducer } from "react";
import { editorReducer, initialState } from "./context/editorReducer";
import FileInput from "./components/FileInput";
import {
  EditorDispatchContext,
  EditorStateContext,
} from "./context/EditorContext";
import PlacesFilter from "./components/PlacesFilter";
import PlaceRow from "./components/PlaceRow";

function App() {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  const { places, filteredPlaces } = state;

  return (
    <EditorStateContext.Provider value={state}>
      <EditorDispatchContext.Provider value={dispatch}>
        <FileInput />
        {places.length > 0 && <PlacesFilter />}
        {filteredPlaces.length > 0 && (
          <div className="placesList">
            {filteredPlaces.map((place: any) => {
              return <PlaceRow place={place} key={"place" + place.id} />;
            })}
          </div>
        )}
      </EditorDispatchContext.Provider>
    </EditorStateContext.Provider>
  );
}

export default App;
