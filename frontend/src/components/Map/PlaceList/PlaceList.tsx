import { MutableRefObject, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useMap } from "react-leaflet";
import { LatLng, DomEvent } from "leaflet";

import { PlacesState } from "state/types";
import { PlacesDispatchContext, PlacesStateContext } from "PlacesContext";
import IconToiletPaper from "icons/ToiletPaper";
import PlaceListItem from "./PlaceListItem";
import { AnalyticsEvents, PlaceDetailsEventSources } from "constants/analytics";
import { PlacesActions } from "state/actions";

import va from "@vercel/analytics";
import "./PlaceList.css";

const PlaceList = ({ isOpen, setIsOpen }) => {
	const map = useMap();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useContext(PlacesDispatchContext);
	const { nearestPlaces, selectedPlace } = useContext(
		PlacesStateContext
	) as PlacesState;

	const placeListRef: MutableRefObject<HTMLDivElement | null> =
		useRef<HTMLDivElement>(null);

	// Click on a place list item and navigate to the place details page.
	const handleClickPlace = (place) => {
		const latLng = new LatLng(place.position[0], place.position[1]);
		map.setView(latLng, map.getZoom());

		if (place.id !== selectedPlace?.id) {
			navigate("/wc/" + place.id);
		}

		dispatch({
			type: PlacesActions.SET_SELECTED_PLACE,
			payload: {
				selectedPlaceId: place.id,
			},
		});

		va.track(AnalyticsEvents.PLACE_DETAILS_EVENT, {
			selectedPlaceId: place.id,
			source: PlaceDetailsEventSources.SEARCH,
		});
	};

	// Fix to prevent dragging and double-tapping the list from affecting the map
	useEffect(() => {
		if (placeListRef.current) {
			DomEvent.disableClickPropagation(placeListRef.current);
			DomEvent.disableScrollPropagation(placeListRef.current);
		}
	}, [placeListRef.current]);

	return (
		<>
			{nearestPlaces?.length ? (
				<div className="PlaceList" ref={placeListRef}>
					<div className="header">
						<h3>{t("Toilets near you")}</h3>
						<button onClick={() => setIsOpen(!isOpen)}>
							{isOpen ? t("Hide") : t("Show")}
						</button>
					</div>

					<ul className={isOpen ? "open" : "closed"}>
						{nearestPlaces.map(({ place, distance }, i) => {
							return (
								<PlaceListItem
									key={place?.id}
									className={i >= 2 ? "more-than-2" : ""}
									onClick={() => handleClickPlace(place)}
									title={place?.title}
									address={place?.address}
									distance={distance}
									Icon={IconToiletPaper}
								/>
							);
						})}
					</ul>
				</div>
			) : null}
		</>
	);
};
export default PlaceList;
