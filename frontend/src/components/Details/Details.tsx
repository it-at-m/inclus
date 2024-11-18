import { RefObject, useContext, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { LatLng } from "leaflet";
import { useNavigate } from "react-router";
import va from "@vercel/analytics";
import { formatDistance } from "util/geoUtils";
import { PlacesActions } from "state/actions";
import { PlacesState } from "state/types";
import { googleMapsDirectionsURL } from "constants/api";
import { AnalyticsEvents } from "constants/analytics";
import { PlacesDispatchContext, PlacesStateContext } from "PlacesContext";
import CloseIcon from "icons/Close";
import DetailSummary from "./DetailSummary";
import DetailFloorplan from "./DetailFloorplan";
import DetailPhotos from "./DetailPhotos";
import DetailDescription from "./DetailDescription";
import "./Details.css";

const Details = () => {
	const { selectedPlace, currentLocation } = useContext(
		PlacesStateContext
	) as PlacesState;
	const dispatch = useContext(PlacesDispatchContext);
	const scrollingContainerRef: RefObject<HTMLDivElement> = useRef(null);

	const navigate = useNavigate();
	const { t } = useTranslation();

	let distance: number | null = null;
	if (currentLocation && selectedPlace?.position) {
		const position = new LatLng(
			selectedPlace.position[0],
			selectedPlace.position[1]
		);
		distance = position.distanceTo(currentLocation);
	}

	const resetSelectedPlace = () => {
		dispatch({
			type: PlacesActions.SET_SELECTED_PLACE,
			payload: {
				selectedPlace: null,
			},
		});
		navigate("/");
	};

	const clickRoute = () => {
		if (selectedPlace) {
			va.track(AnalyticsEvents.CLICK_ROUTE_EVENT, {
				destinationPlace: selectedPlace?.id,
			});
			window.open(
				googleMapsDirectionsURL + selectedPlace?.position,
				"_blank"
			);
		}
	};

	useEffect(() => {
		if (scrollingContainerRef.current && selectedPlace) {
			scrollingContainerRef.current.scrollTo(0, 0);
		}
	}, [selectedPlace, scrollingContainerRef]);

	return useMemo(() => {
		return selectedPlace ? (
			<div className="Details container">
				<div
					className="col gap align-stretch scrollarea"
					ref={scrollingContainerRef}
				>
					<div className="row gap align-start">
						<h1 className="grow">{selectedPlace?.title}</h1>
						<button
							type="button"
							className="icon-only"
							onClick={resetSelectedPlace}
						>
							<CloseIcon />
						</button>
					</div>

					<div className="row gap align-center">
						<button
							type="button"
							className="primary rounded start-route col align-center justify-center"
							onClick={clickRoute}
						>
							<b>{t("Go")}</b>
							{distance !== null && (
								<span className="distance">
									{formatDistance(distance)}
								</span>
							)}
						</button>

						<div>
							{selectedPlace?.address},<br />
							{selectedPlace?.zip_code} {selectedPlace?.city}
						</div>
					</div>

					<DetailSummary />
					<DetailFloorplan />
					<DetailPhotos />
					<DetailDescription />
				</div>
			</div>
		) : null;
	}, [selectedPlace, distance, dispatch]);
};

export default Details;
