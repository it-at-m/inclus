import { defaultPosition } from "../src/constants/geo";
import { LatLng, LatLngBounds } from "leaflet";

export const currentLocation = {
	lat: defaultPosition[0],
	lng: defaultPosition[1],
	equals: (currentLocation: { lat: number; lng: number }) => {
		return true;
	},
	distanceTo: () => {
		return 0;
	},
	wrap: () => {
		return new LatLng(defaultPosition[0], defaultPosition[1]);
	},
	toBounds: () => {
		return new LatLngBounds([defaultPosition[0], defaultPosition[1]]);
	},
	clone: () => {
		return new LatLng(defaultPosition[0], defaultPosition[1]);
	},
};
