import { LatLngExpression } from "leaflet";
import { Place } from "types/place";
import { PlacesFuseProvider } from "./PlacesFuseProvider";
import {
	CustomSearchResult,
	OSMPlace,
	Provider,
	SearchQuery,
	SearchResult,
} from "./types";

class CombinedProvider {
	private PlacesFuseProvider: PlacesFuseProvider;

	constructor(private places: Place[]) {
		this.PlacesFuseProvider = new PlacesFuseProvider(places);
	}

	async fetchSuggestions(query: string): Promise<Array<SearchResult>> {
		const response = await fetch(
			"https://nominatim.openstreetmap.org/search?q=" +
				encodeURIComponent(query) +
				"&format=json&countrycodes=de"
		);

		const results: Array<OSMPlace> = await response.json();

		return results.map((result: OSMPlace) => {
			const customSearchResult: SearchResult = {
				x: parseFloat(result.lon),
				y: parseFloat(result.lat),
				label: result.display_name,
				bounds: [],
				provider: Provider.OpenStreetMap,
				showMarker: true,
			};
			return customSearchResult;
		});
	}

	async search({ query }: SearchQuery): Promise<CustomSearchResult[]> {
		const osmResults: Array<SearchResult> = await this.fetchSuggestions(
			query
		);
		const fuseSearchResults = await this.PlacesFuseProvider.search({
			query,
		});
		const formattedOsmResults: CustomSearchResult[] = osmResults.map(
			(result) => {
				const { x, y, label, bounds } = result;
				return {
					x,
					y,
					id: null,
					label,
					bounds: bounds
						? [
								bounds[0] as LatLngExpression,
								bounds[1] as LatLngExpression,
						  ]
						: [],
					provider: Provider.OpenStreetMap,
					showMarker: true,
				};
			}
		);

		// Limit the number of results from each provider
		const osmLimit = 3;
		const fuseSearchLimit = 3;
		const limitedOsmResults = formattedOsmResults.slice(0, osmLimit);
		const limitedFuseSearchResults = fuseSearchResults.slice(
			0,
			fuseSearchLimit
		);

		// Fill the gaps if there are not enough results from one provider
		const remainingOsmSlots = Math.max(
			osmLimit - limitedOsmResults.length,
			0
		);
		const remainingFuseSearchSlots = Math.max(
			fuseSearchLimit - limitedFuseSearchResults.length,
			0
		);
		const extraOsmResults = formattedOsmResults.slice(
			osmLimit,
			osmLimit + remainingFuseSearchSlots
		);
		const extraFuseSearchResults = fuseSearchResults.slice(
			fuseSearchLimit,
			fuseSearchLimit + remainingOsmSlots
		);

		const mergedResults = [
			...limitedFuseSearchResults,
			...extraFuseSearchResults,
			...limitedOsmResults,
			...extraOsmResults,
		];

		return mergedResults;
	}
}

export default CombinedProvider;
