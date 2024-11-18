import { Place, PlaceAndDistance } from "../types/place";
import { LatLng, LatLngExpression } from "leaflet";

export interface PlacesState {
	loading: boolean;
	error: string | null;
	places: Place[];
	visiblePlaces: Place[];
	selectedPlace?: Place;
	filterValue: FilterValue;
	coordinates: CoordinateLimits | null;
	isWaitingForLocation: boolean;
	currentLocation: LatLng | null;
	nearestPlaces?: PlaceAndDistance[];
	isDistanceByMapCenter: boolean;
}

export interface FilterValue {
	euroKey: number;
	doorWidth: number;
	rampVal: number;
}

export interface CoordinateLimits {
	latitude: MinMaxPair;
	longitude: MinMaxPair;
}

export interface MinMaxPair {
	min: number;
	max: number;
}

export interface PlacesPayload {
	places: Place[];
}

export interface NearestPlacesPayload {
	nearestPlaces: PlaceAndDistance[];
}

export interface SelectedPlacePayload {
	selectedPlaceId: number;
}

export interface IsWaitingForLocationPayload {
	isWaitingForLocation: boolean;
}

export interface FilterValuePayload {
	filterValue: FilterValue;
}

export interface CurrentLocationPayload {
	currentLocation: LatLng;
}

export interface IsDistanceByMapCenterPayload {
	isDistanceByMapCenter: boolean;
}

export interface PlacesAction {
	type: string;
	payload:
		| null
		| PlacesPayload
		| SelectedPlacePayload
		| FilterValuePayload
		| IsWaitingForLocationPayload
		| CurrentLocationPayload
		| IsDistanceByMapCenterPayload
		| NearestPlacesPayload;
}

export type LegendItem = {
	key: string;
	icon: SVGElement;
	label: string;
};

export type SVGIconProps = {
	className?: string;
	fill?: string;
};

// For utils.ts to sort and slice lists
export interface SortableListItem {
	position?: LatLngExpression;
	x?: number;
	y?: number;
}

export interface SortableListOptions {
	mapCenter: LatLngExpression;
}
