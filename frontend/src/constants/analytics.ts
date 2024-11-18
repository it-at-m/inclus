export enum AnalyticsEvents {
	LOCATE_ME_EVENT = "LOCATE_ME_USED", // locate me button was clicked
	SEARCH_EVENT = "SEARCH_USED", // search control was used
	SEARCH_RESULT_CLICK_EVENT = "SEARCH_RESULT_CLICK", // search control was used
	PLACE_DETAILS_EVENT = "PLACE_DETAILS_SHOWN", // place detail view was opened
	CLICK_ROUTE_EVENT = "ROUTE_REQUESTED", // route button in details view was clicked
}

export enum PlaceDetailsEventSources {
	SEARCH = "SEARCH",
	MAP = "MAP",
	NEAREST = "NEAREST",
}
