import React, {
	MutableRefObject,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useMap } from "react-leaflet";
import { useSelect } from "downshift";
import { Marker, Control, DomEvent } from "leaflet";
import {
	PlacesDispatchContext,
	PlacesStateContext,
} from "../../../PlacesContext";
import { PlacesActions } from "state/actions";
import { PlacesState } from "state/types";

import CombinedProvider from "./CombinedProvider";
import IconMagGlass from "icons/magnifyingglass.svg";
import Close from "icons/Close";
import { CustomSearchResult, SearchResult } from "./types";
import SearchSuggestionListItem from "./SearchSuggestionListItem";
import va from "@vercel/analytics";
import { AnalyticsEvents } from "../../../constants/analytics";
import { sortAndSliceByDistance } from "state/utils";

const SearchControl: React.FC = () => {
	const map = useMap();

	const { places } = useContext(PlacesStateContext) as PlacesState;
	const dispatch = useContext(PlacesDispatchContext);
	const combinedProvider = new CombinedProvider(places);
	const [suggestions, setSuggestions] = useState<CustomSearchResult[]>([]);

	const [inputValue, setInputValue] = useState("");
	const [prevInputValue, setPrevInputValue] = useState("");

	const searchInputRef: MutableRefObject<HTMLDivElement | null> =
		useRef<HTMLDivElement>(null);
	const searchResultsRef: MutableRefObject<HTMLDivElement | null> =
		useRef<HTMLDivElement>(null);

	const markerRef = useRef<Marker | null>(null);

	const { t } = useTranslation();

	const stopLocationQuery = useCallback(() => {
		dispatch({
			type: PlacesActions.SET_WAITING_LOCATION,
			payload: {
				isWaitingForLocation: false,
			},
		});
	}, [map, dispatch]);

	map.on("geosearch/showlocation", stopLocationQuery);
	map.on("dragend", stopLocationQuery);

	const {
		isOpen,
		getMenuProps,
		getToggleButtonProps,
		highlightedIndex,
		getItemProps,
	} = useSelect<SearchResult>({
		items: suggestions,
		itemToString: (item) => (item ? item.label : ""),
	});

	const fetchSuggestions = async (query: string) => {
		if (query) {
			const results = await combinedProvider.search({ query });
			// Sort and slice the results
			const mapCenter = map.getCenter();
			const sortedResults = sortAndSliceByDistance(results, 6, mapCenter);
			setSuggestions(sortedResults);
			/* dispatch({
				type: PlacesActions.SET_NEAREST_PLACES,
				payload: { nearestPlaces: null },
			}); */
		} else {
			va.track(AnalyticsEvents.SEARCH_EVENT, { searchInput: query });
			setSuggestions([]);
		}
	};

	useEffect(() => {
		let delayTimer;

		if (inputValue.length <= 2) {
			setSuggestions([]);
		} else if (inputValue !== prevInputValue) {
			delayTimer = setTimeout(() => {
				fetchSuggestions(inputValue);
				setPrevInputValue(inputValue);
			}, 200);
		}
		return () => {
			clearTimeout(delayTimer);
		};
	}, [inputValue, prevInputValue]);

	useEffect(() => {
		const searchControl = Control.extend({
			onAdd: () => {
				const container = document.createElement("div");
				return container;
			},
		});

		const controlInstance = new searchControl({ position: "topleft" });
		map.addControl(controlInstance);

		return () => {
			map.removeControl(controlInstance);
		};
	}, [map]);

	// Fix for the issue that trying to select text in the search input causes map moving around
	useEffect(() => {
		if (searchInputRef.current) {
			DomEvent.disableClickPropagation(searchInputRef.current);
			DomEvent.disableScrollPropagation(searchInputRef.current);

			// Add a keydown event listener to prevent Leaflet from interfering with the space key
			const handleKeydown = (e: KeyboardEvent) => {
				if (e.key === " ") {
					DomEvent.stopPropagation(e);
				}
			};

			searchInputRef.current.addEventListener("keydown", handleKeydown);

			// Remove the event listener on cleanup
			return () => {
				searchInputRef.current?.removeEventListener(
					"keydown",
					handleKeydown
				);
			};
		}
	}, [searchInputRef.current]);

	// Fix for the issue that trying to scroll the search results zooms the map
	useEffect(() => {
		if (searchResultsRef.current) {
			DomEvent.disableClickPropagation(searchResultsRef.current);
			DomEvent.disableScrollPropagation(searchResultsRef.current);
		}
	}, [searchResultsRef.current]);

	const handleMarker = (marker: Marker | null) => {
		if (markerRef.current) {
			map.removeLayer(markerRef.current);
			markerRef.current = null;
		}

		if (marker) {
			markerRef.current = marker;
		}
	};

	return (
		<div className="search-control search-container">
			<div className="search-input-wrapper" ref={searchInputRef}>
				<input
					{...getToggleButtonProps()}
					className="search-input"
					value={inputValue || ""}
					onChange={(e) => {
						setInputValue(e.target.value);
					}}
					placeholder={t("Where are you going?")}
				/>
				{inputValue ? (
					<div className="search-input-icon">
						<div
							aria-label="clear selection"
							onClick={() => {
								setInputValue("");
								setSuggestions([]);
							}}
						>
							<Close />
						</div>
					</div>
				) : (
					<img
						src={IconMagGlass}
						alt="IconMagGlass"
						className="icon-search"
					/>
				)}
			</div>
			<ul
				{...getMenuProps({}, { suppressRefError: true })}
				className={`search-results ${isOpen ? "open" : ""}`}
				ref={searchResultsRef}
			>
				{suggestions.length > 0 && (
					<li className="header">
						<h3>{t("Search results")}</h3>
					</li>
				)}
				{suggestions.map((suggestion, index) => (
					<SearchSuggestionListItem
						key={`${suggestion.provider}-${suggestion.x}-${suggestion.y}-${index}`}
						suggestion={suggestion}
						index={index}
						setSuggestions={setSuggestions}
						highlightedIndex={highlightedIndex}
						getItemProps={getItemProps}
						handleMarker={handleMarker}
						inputValue={inputValue}
					/>
				))}
			</ul>
		</div>
	);
};

export default SearchControl;
