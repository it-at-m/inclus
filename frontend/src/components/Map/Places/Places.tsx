import React, {
	Fragment,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useMap } from "react-leaflet";
import { useMatch, useNavigate } from "react-router";
import va from "@vercel/analytics";
import { PlacesDispatchContext, PlacesStateContext } from "PlacesContext";
import { PlacesState } from "state/types";
import { PlacesActions } from "state/actions";
import PlaceComponent from "./PlaceComponent";
import {
	AnalyticsEvents,
	PlaceDetailsEventSources,
} from "../../../constants/analytics";
import { markerZoomLevel } from "../../../constants/geo";

const Places = () => {
	const dispatch = useContext(PlacesDispatchContext);
	const navigate = useNavigate();
	const { visiblePlaces: places, selectedPlace } = useContext(
		PlacesStateContext
	) as PlacesState;
	const [displayPlaces, setDisplayPlaces] = useState<boolean>(false);

	const map = useMap();

	const match = useMatch("/wc/:id");

	useEffect(() => {
		if (match?.params?.id) {
			const placeId = match.params.id;
			selectPlace(Number(placeId));
		} else {
			selectPlace(null);
		}
	}, [match, places]);

	const selectPlace = (placeId: number | null) => {
		if (placeId) {
			if (placeId !== selectedPlace?.id) {
				navigate("/wc/" + placeId);
			}
		}
		dispatch({
			type: PlacesActions.SET_SELECTED_PLACE,
			payload: { selectedPlaceId: placeId },
		});

		va.track(AnalyticsEvents.PLACE_DETAILS_EVENT, {
			selectedPlaceId: placeId,
			source: PlaceDetailsEventSources.MAP,
		});
	};

	useEffect(() => {
		if (selectedPlace?.position) {
			if (!map.getBounds().contains(selectedPlace.position)) {
				map.flyTo(selectedPlace.position, map.getZoom(), {
					duration: 0.1,
				});
			}
		}
	}, [selectedPlace, map]);

	const checkDisplay = () => {
		setDisplayPlaces(map.getZoom() >= markerZoomLevel);
	};

	useEffect(() => {
		checkDisplay();
		map.on("moveend", checkDisplay);
		map.on("zoomend", checkDisplay);

		return () => {
			map.off("moveend", checkDisplay);
			map.off("zoomend", checkDisplay);
		};
	}, [map]);

	const placeMarkers = useMemo(() => {
		return (
			places && (
				<Fragment>
					{places.map((place) => (
						<PlaceComponent
							key={place.id}
							place={place}
							isSelected={place.id === selectedPlace?.id}
							selectPlace={selectPlace}
						/>
					))}
				</Fragment>
			)
		);
	}, [places, selectedPlace]);

	return displayPlaces ? placeMarkers : null;
};

export default Places;
