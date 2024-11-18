import { CoordinateLimits } from "../state/types";
import { Place } from "../types/place";
import i18n from "../@types/i18n";

type FindCoordinatePolygonFunction = (places: Place[]) => CoordinateLimits;

export const findCoordinatePolygon: FindCoordinatePolygonFunction = (
	places: Place[]
) => {
	let minLatitude: number = Number.MAX_VALUE,
		maxLatitude: number = Number.MIN_VALUE,
		minLongitude: number = Number.MAX_VALUE,
		maxLongitude: number = Number.MIN_VALUE;

	places.forEach((place) => {
		if (place.position[0] < minLatitude) {
			minLatitude = place.position[0];
		}
		if (place.position[0] > maxLatitude) {
			maxLatitude = place.position[0];
		}
		if (place.position[1] < minLongitude) {
			minLongitude = place.position[1];
		}
		if (place.position[1] > maxLongitude) {
			maxLongitude = place.position[1];
		}
	});

	return {
		latitude: {
			min: minLatitude,
			max: maxLatitude,
		},
		longitude: {
			min: minLongitude,
			max: maxLongitude,
		},
	};
};

export const formatDistance = (distance: number) => {
	if (distance >= 10000) {
		return Math.round(distance / 1000.0) + " km";
	} else if (distance >= 900) {
		return (
			(distance / 1000.0).toLocaleString(i18n.resolvedLanguage, {
				minimumFractionDigits: 0,
				maximumFractionDigits: 1,
			}) + " km"
		);
	} else {
		return Math.round(distance / 10) * 10 + " m";
	}
};
