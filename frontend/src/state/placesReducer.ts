import { DoorWidths, EuroKeyValues, RampValues } from "../types/enums";
import { filterPlaces } from "./utils";
import {
	CurrentLocationPayload,
	FilterValuePayload,
	IsDistanceByMapCenterPayload,
	IsWaitingForLocationPayload,
	NearestPlacesPayload,
	PlacesAction,
	PlacesPayload,
	PlacesState,
	SelectedPlacePayload,
} from "./types";
import { PlacesActions } from "./actions";
import { findCoordinatePolygon } from "../util/geoUtils";

export const initialState = {
	loading: false,
	error: null,
	places: [],
	visiblePlaces: [],
	filterValue: {
		euroKey: EuroKeyValues.NOT_SELECTED,
		doorWidth: DoorWidths.NOT_SELECTED,
		rampVal: RampValues.NOT_SELECTED,
	},
	coordinates: null,
	isWaitingForLocation: false,
	currentLocation: null,
	isDistanceByMapCenter: false,
};

const placesReducer = (
	state: PlacesState = initialState,
	action: PlacesAction
): PlacesState => {
	const { type, payload } = action;
	switch (type) {
		case PlacesActions.PLACES_LIST_REQUEST: {
			return { ...state, loading: true, error: null };
		}

		case PlacesActions.PLACES_LIST_SUCCESS: {
			const { places } = <PlacesPayload>payload;

			const newCoordinates = findCoordinatePolygon(places);

			return {
				...state,
				loading: false,
				places,
				visiblePlaces: places,
				coordinates: newCoordinates,
			};
		}

		case PlacesActions.PLACES_LIST_FAIL: {
			return {
				...state,
				loading: false,
				places: [],
				error: "Fetching places failed",
			};
		}

		case PlacesActions.FILTER_PLACES: {
			const { filterValue } = <FilterValuePayload>payload;
			return {
				...state,
				filterValue,
				visiblePlaces: filterPlaces(state.places, filterValue),
			};
		}

		case PlacesActions.SET_SELECTED_PLACE: {
			const { selectedPlaceId } = <SelectedPlacePayload>payload;
			const newSelectedPlace = state.places.find((pp) => {
				return pp.id === selectedPlaceId;
			});
			return { ...state, selectedPlace: newSelectedPlace };
		}

		case PlacesActions.SET_WAITING_LOCATION: {
			const { isWaitingForLocation } = <IsWaitingForLocationPayload>(
				payload
			);
			return { ...state, isWaitingForLocation };
		}

		case PlacesActions.SET_CURRENT_LOCATION: {
			const { currentLocation } = <CurrentLocationPayload>payload;
			return { ...state, currentLocation };
		}

		case PlacesActions.SET_NEAREST_PLACES: {
			const { nearestPlaces } = <NearestPlacesPayload>payload;
			return {
				...state,
				nearestPlaces,
			};
		}

		case PlacesActions.SET_IS_DISTANCE_BY_MAP_CENTER: {
			const { isDistanceByMapCenter } = <IsDistanceByMapCenterPayload>(
				payload
			);
			return { ...state, isDistanceByMapCenter };
		}

		default:
			return state;
	}
};

export default placesReducer;
