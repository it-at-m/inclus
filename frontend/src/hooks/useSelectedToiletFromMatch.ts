import { useMatch } from "react-router";
import { useContext, useEffect } from "react";
import { PlacesActions } from "../state/actions";
import { PlacesDispatchContext, PlacesStateContext } from "../PlacesContext";
import { PlacesState } from "../state/types";

export const useSelectedToiletFromMatch = (matchString: string) => {
	const match = useMatch(matchString);

	const { selectedPlace, places } = useContext(
		PlacesStateContext
	) as PlacesState;
	const dispatch = useContext(PlacesDispatchContext);

	useEffect(() => {
		if (
			match &&
			match.params.id &&
			(!selectedPlace || Number(match.params.id) !== selectedPlace.id) &&
			places.length > 0
		) {
			dispatch({
				type: PlacesActions.SET_SELECTED_PLACE,
				payload: { selectedPlaceId: Number(match.params.id) },
			});
		}
	}, [match, selectedPlace, dispatch, places]);

	return selectedPlace;
};
