import { Place } from "../../../types/place";
import Fuse from "fuse.js";
import { CustomSearchResult, Provider, SearchQuery } from "./types";

export class PlacesFuseProvider {
	constructor(private places: Place[]) {}

	async search({ query }: SearchQuery): Promise<CustomSearchResult[]> {
		const options: Fuse.IFuseOptions<Place> = {
			includeScore: true,
			keys: ["title", "address"],
		};

		const fuse = new Fuse(this.places, options);
		const searchResults = fuse.search(query);

		return searchResults.map(({ item }) => this.formatResult(item));
	}

	formatResult = (item: Place): CustomSearchResult => {
		const genericValue = "Not available";
		const {
			position = [0, 0],
			title = genericValue,
			address = genericValue,
			city = genericValue,
			id,
		} = item;

		const [y, x] = position as [number, number];
		return {
			x,
			y,
			id,
			label: `${title}, ${address}, ${city}`,
			bounds: [
				[y - 0.005, x - 0.005],
				[y + 0.005, x + 0.005],
			],
			provider: Provider.CBFDataProvider,
			showMarker: false,
		};
	};
}
