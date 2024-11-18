import { LatLngExpression } from "leaflet";

export interface Place {
	id: number;
	title: string;
	short_description: string;
	position: LatLngExpression;
	photo?: string; //?: use to declare as optional.
	plan?: string;
	seeMoreLink?: string;
	address: string;
	eurokey: string | number; // TODO: make it clean string, remove all numbers from json
	ramp_steepness: string;
	ramp_length: string;
	door_width: string;
	zip_code?: string;
	city: string;
	grip?: string;
	direction: string;
	access: string;
	interior_description: string;
	wc_details: string;
	wc_accessright: string;
	wc_accessleft: string;
	modified: string;
	closest_toilets?: Array<{ id: number; distance: number }>;
}

export interface PlaceAndDistance {
	place: Place;
	distance: number;
}
