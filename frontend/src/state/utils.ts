import { Place, PlaceAndDistance } from "../types/place";
import { DoorWidths, EuroKeyValues, RampValues } from "../types/enums";
import { FilterValue, SortableListItem } from "./types";
import { LatLng, LatLngExpression } from "leaflet";

export const filterPlaces = (places: Place[], filterValue: FilterValue) => {
	let filteredPlaces = places;
	if (
		filterValue.euroKey !== undefined &&
		filterValue.euroKey !== EuroKeyValues.NOT_SELECTED
	) {
		filteredPlaces = filteredPlaces.filter(
			(place) => Number(place.eurokey) === filterValue.euroKey
		);
	}
	if (
		filterValue.doorWidth !== undefined &&
		filterValue.doorWidth !== DoorWidths.NOT_SELECTED
	) {
		filteredPlaces = filteredPlaces.filter(
			(place) => Number(place.door_width) >= filterValue.doorWidth
		);
	}
	if (
		filterValue.rampVal !== undefined &&
		filterValue.rampVal !== RampValues.NOT_SELECTED
	) {
		filteredPlaces = filteredPlaces.filter((place) => {
			return Number(place.ramp_steepness) <= filterValue.rampVal;
		});
	}
	return filteredPlaces;
};

export const filterByDistance = (
	placeList: Place[],
	locationMeLatLng: LatLng | null,
	targetDistance: number // m
): PlaceAndDistance[] => {
	if (!locationMeLatLng) {
		return [];
	}

	const filteredList: PlaceAndDistance[] = [];

	placeList.forEach((item) => {
		const locationLatLng = new LatLng(item.position[0], item.position[1]);

		// Use the distanceTo method from Leaflet to calculate the distance between two locations.
		const distance = Math.round(
			locationMeLatLng.distanceTo(locationLatLng)
		);
		if (distance <= targetDistance) {
			filteredList.push({ place: item, distance });
		}
	});
	return filteredList;
};

export const sortAndSliceByDistance = <T extends SortableListItem>(
	list: T[],
	limit: number,
	mapCenter: LatLngExpression
): T[] => {
	if (!list || list.length === 0) {
		return [];
	}

	if (!mapCenter) return [];

	const sortedList = list.sort((a, b) => {
		const aLatLng = new LatLng(
			a.position?.[0] || a.y!,
			a.position?.[1] || a.x!
		);
		const bLatLng = new LatLng(
			b.position?.[0] || b.y!,
			b.position?.[1] || b.x!
		);

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return aLatLng.distanceTo(mapCenter) - bLatLng.distanceTo(mapCenter);
	});

	return sortedList.slice(0, limit);
};
