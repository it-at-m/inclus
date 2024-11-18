import { dataCacheUrl } from "constants/api";

export async function loadData() {
	const response = await fetch(dataCacheUrl);
	if (!response.ok) {
		const message = `Could not load cached places: ${response.status}`;
		throw new Error(message);
	}
	const places = await response.json();
	return places;
}
