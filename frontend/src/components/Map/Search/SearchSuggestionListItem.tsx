import React, { FC, useContext } from "react";
import L, { LatLng } from "leaflet";
import { useNavigate } from "react-router";
import { useMap } from "react-leaflet";
import IconMarker from "icons/Marker";
import IconToiletPaper from "icons/ToiletPaper";
import { CustomSearchResult, Provider, SearchResult } from "./types";
import { PlacesActions } from "state/actions";
import { PlacesDispatchContext, PlacesStateContext } from "PlacesContext";
import va from "@vercel/analytics";
import { AnalyticsEvents, PlaceDetailsEventSources } from "constants/analytics";
import { PlacesState } from "state/types";
import PlaceListItem from "../PlaceList/PlaceListItem";

type SearchSuggestionListItemProps = {
	suggestion: CustomSearchResult;
	index: number;
	highlightedIndex: number;
	getItemProps: (options: any) => object;
	setSuggestions: (suggestions: CustomSearchResult[]) => void;
	handleMarker: (marker: L.Marker<any> | null) => void;
	inputValue: string;
};

const SearchSuggestionListItem: FC<SearchSuggestionListItemProps> = ({
	suggestion,
	index,
	highlightedIndex,
	getItemProps,
	setSuggestions,
	handleMarker,
	inputValue,
}) => {
	const map = useMap();
	const dispatch = useContext(PlacesDispatchContext);
	const { selectedPlace, currentLocation, isDistanceByMapCenter } =
		useContext(PlacesStateContext) as PlacesState;
	const navigate = useNavigate();

	const position = new LatLng(suggestion.y, suggestion.x);
	let distance: number | undefined = undefined;

	if (!isDistanceByMapCenter && currentLocation) {
		distance = currentLocation.distanceTo(position);
	} else {
		const mapCenter = map.getCenter();
		if (mapCenter.lat && mapCenter.lng) {
			distance = new LatLng(mapCenter.lat, mapCenter.lng).distanceTo(
				position
			);
		}
	}

	const handleSuggestionClick = () => {
		va.track(AnalyticsEvents.SEARCH_RESULT_CLICK_EVENT, {
			searchInput: inputValue,
			suggestionLabel: suggestion.label,
			suggestionProvider: suggestion.provider,
		});
		const latLng = new LatLng(suggestion.y, suggestion.x);
		map.setView(latLng, map.getZoom());
		addMarkerIfOSM(suggestion);
		setSuggestions([]); // Clear suggestions list

		if (suggestion.id) {
			if (suggestion.id) {
				if (suggestion.id !== selectedPlace?.id) {
					navigate("/wc/" + suggestion.id);
				}
			}

			dispatch({
				type: PlacesActions.SET_SELECTED_PLACE,
				payload: {
					selectedPlaceId: suggestion.id,
				},
			});
			va.track(AnalyticsEvents.PLACE_DETAILS_EVENT, {
				selectedPlaceId: suggestion.id,
				source: PlaceDetailsEventSources.SEARCH,
			});
		}
	};

	const addMarkerIfOSM = (suggestion: SearchResult) => {
		if (suggestion.provider === Provider.OpenStreetMap) {
			const latLng = new LatLng(suggestion.y, suggestion.x);
			const marker = L.marker(latLng);
			marker.addTo(map);

			const popupContent = `
		  <div style="text-align: center;">
			${suggestion.label.split(",")[0]}
		  </div>`;

			marker.bindPopup(popupContent);
			handleMarker(marker);
		}
	};

	return (
		<PlaceListItem
			itemProps={getItemProps({ item: suggestion, index })}
			className={`${highlightedIndex === index ? "highlighted" : ""}`}
			onClick={handleSuggestionClick}
			title={suggestion.label.split(",")[0]}
			address={suggestion.label
				.split(",")
				.slice(1)
				.map((string) => string.trim())
				.join(", ")}
			distance={distance}
			Icon={
				suggestion.provider === Provider.OpenStreetMap
					? IconMarker
					: IconToiletPaper
			}
		/>
	);
};

export default SearchSuggestionListItem;
