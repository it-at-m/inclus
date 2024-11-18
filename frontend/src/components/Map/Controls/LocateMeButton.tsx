import React, { useContext, useEffect, useState } from "react";
import va from "@vercel/analytics";
import { useTranslation } from "react-i18next";
import { Marker, Tooltip, useMap } from "react-leaflet";
import { trackerIcon } from "constants/icons";
import LocateIcon from "icons/Locate";
import LoadingIcon from "icons/Loading";
import { PlacesDispatchContext, PlacesStateContext } from "PlacesContext";
import { PlacesState } from "state/types";
import { PlacesActions } from "state/actions";
import LocateMeButtonMessage from "./LocateMeButtonMessage";
import "./LocateMeButton.css";
import { AnalyticsEvents } from "constants/analytics";
import { filterByDistance } from "../../../state/utils";

const LocateMeButton = ({ displayNearestPlaces }) => {
	// If the browser doesn't support geolocation, we don't show the button
	if (!navigator.geolocation) return null;

	const map = useMap();
	const { t } = useTranslation();
	const dispatch = useContext(PlacesDispatchContext);
	const { currentLocation, nearestPlaces, places } = useContext(
		PlacesStateContext
	) as PlacesState;

	const [locationPermissionState, setLocationPermissionState] =
		useState("unknown");

	// if user click locate me button
	const [isClicked, setIsClicked] = useState(false);

	const { isWaitingForLocation } = useContext(
		PlacesStateContext
	) as PlacesState;

	// To query location permissions and update state
	const queryLocationPermissions = () => {
		navigator.permissions
			.query({
				name: "geolocation",
			})
			.then((permissions) =>
				setLocationPermissionState(permissions.state)
			);
	};

	// To get location using Leaftlet map.locate and move the map
	const mapGetLocation = (initiatedByUser = false) => {
		if (map) {
			if (initiatedByUser) {
				dispatch({
					type: PlacesActions.SET_WAITING_LOCATION,
					payload: {
						isWaitingForLocation: true,
					},
				});
			}
			map.locate({
				watch: true,
				setView: false,
				maximumAge: 60 * 1000, // 60 seconds
				enableHighAccuracy: true,
				maxZoom: map.getZoom(),
			});
		}
	};

	// Handle locationfound event
	const handleLocationFound = async () => {
		// to control distance by location coordinates
		await dispatch({
			type: PlacesActions.SET_IS_DISTANCE_BY_MAP_CENTER,
			payload: {
				isDistanceByMapCenter: false,
			},
		});

		const nearestPlaces = filterByDistance(places, currentLocation, 2000)
			.sort((a, b) => {
				if (a.distance < b.distance) {
					return -1;
				} else if (a.distance > b.distance) {
					return 1;
				}
				return 0;
			})
			.slice(0, 3);

		await dispatch({
			type: PlacesActions.SET_NEAREST_PLACES,
			payload: { nearestPlaces },
		});
		setIsClicked(false);

		// if user moved the map before, reset the map to current location
		if (map && currentLocation) {
			map.setView(currentLocation);
		}
	};

	// Handle locate button onClick
	async function toggleLocate(e: { preventDefault: () => void }) {
		e.preventDefault();
		setIsClicked(!isClicked);
		if (isWaitingForLocation) {
			map && map.stopLocate();
			dispatch({
				type: PlacesActions.SET_WAITING_LOCATION,
				payload: {
					isWaitingForLocation: false,
				},
			});
		} else {
			va.track(AnalyticsEvents.LOCATE_ME_EVENT);
			if (!currentLocation) {
				mapGetLocation(true);
			} else {
				handleLocationFound();
			}
		}
	}

	useEffect(() => {
		map.on("locationfound", function (e) {
			dispatch({
				type: PlacesActions.SET_CURRENT_LOCATION,
				payload: {
					currentLocation: e.latlng,
				},
			});
		});

		return () => {
			map.off("locationfound");
		};
	});

	useEffect(() => {
		if (isWaitingForLocation && currentLocation) {
			dispatch({
				type: PlacesActions.SET_WAITING_LOCATION,
				payload: {
					isWaitingForLocation: false,
				},
			});
			if (isClicked) {
				handleLocationFound();
			}
			map.setView(currentLocation);
		}
	}, [isWaitingForLocation, currentLocation]);

	useEffect(() => {
		// If we don't know about geolocation permissions, query the browser
		if (locationPermissionState === "unknown") {
			queryLocationPermissions();
		}
	}, [locationPermissionState]);

	useEffect(() => {
		// If we already have geolocation permissions, get the location
		if (locationPermissionState === "granted" && !isWaitingForLocation) {
			mapGetLocation();
		}
	}, [locationPermissionState]);

	return (
		<div
			className={`LocateMeButton row ${
				nearestPlaces && nearestPlaces?.length > 0 ? "" : "bottom-space"
			}`}
		>
			<LocateMeButtonMessage />
			<button
				type="button"
				aria-label={t("Find my location on the map")}
				className={`map-control col justify-center leaflet-control locate-me 
					${isWaitingForLocation ? "loading" : ""}
				 	${displayNearestPlaces ? "" : "not-display-nearest-places-margin-bottom"}`}
				onClick={toggleLocate}
			>
				{isWaitingForLocation ? <LoadingIcon /> : <LocateIcon />}
			</button>
			{currentLocation && (
				<Marker position={currentLocation} icon={trackerIcon}>
					<Tooltip>{t("You are here")}</Tooltip>
				</Marker>
			)}
		</div>
	);
};

export default LocateMeButton;
