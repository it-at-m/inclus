import { LatLngExpression } from "leaflet";

export interface SearchQuery {
	query: string;
}

export enum Provider {
	OpenStreetMap = "OpenStreetMap",
	CBFDataProvider = "CBFDataProvider",
}

export interface CustomSearchResult {
	x: number;
	y: number;
	id: number | null;
	label: string;
	bounds: LatLngExpression[];
	provider: Provider;
	showMarker: boolean;
}

export interface SearchResult {
	x: number;
	y: number;
	label: string;
	bounds: LatLngExpression[];
	provider: Provider;
	showMarker: boolean;
}

export interface OSMPlace {
	place_id: number;
	licence: string;
	osm_type: string;
	osm_id: number;
	boundingbox: string[];
	lat: string;
	lon: string;
	display_name: string;
	class: string;
	type: string;
	importance: number;
}
