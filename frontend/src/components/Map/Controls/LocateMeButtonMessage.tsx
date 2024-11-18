import React, { useContext, useEffect, useState } from "react";
import { defaultPosition, markerZoomLevel } from "constants/geo";
import { useMap } from "react-leaflet";
import { useTranslation } from "react-i18next";
import { LatLng } from "leaflet";
import { PlacesStateContext } from "PlacesContext";
import { PlacesState } from "state/types";

const LocateMeButtonMessage = () => {
	const map = useMap();
	const { t } = useTranslation();

	const [onBoarded, setOnBoarded] = useState<boolean>(
		localStorage.getItem("onBoardedLocateMe") == "true"
	);
	const [outsideAreaMessageSeen, setOutsideAreaMessageSeen] =
		useState<boolean>(
			localStorage.getItem("outsideAreaMessageSeen") == "true"
		);
	const [displayInfo, setDisplayInfo] = useState(!onBoarded);

	const setOnboardingInStorage = () => {
		localStorage.setItem("onBoardedLocateMe", "true");
		setOnBoarded(true);
	};

	const setOutsideAreaInStorage = () => {
		localStorage.setItem("outsideAreaMessageSeen", "true");
		setOutsideAreaMessageSeen(true);
	};

	const closeButtonCallback = onBoarded
		? setOutsideAreaInStorage
		: setOnboardingInStorage;

	const messageText = !onBoarded
		? t("locateMeOnboardingMessage")
		: t("infoMessageOutsideWarning");

	const { coordinates } = useContext(PlacesStateContext) as PlacesState;

	useEffect(() => {
		if (onBoarded) {
			map.on("moveend", () => {
				const newLoc: LatLng = map.getCenter();
				if (
					coordinates &&
					!outsideAreaMessageSeen &&
					(newLoc.lat < coordinates?.latitude.min ||
						newLoc.lat > coordinates?.latitude.max ||
						newLoc.lng < coordinates?.longitude.min ||
						newLoc.lng > coordinates?.longitude.max)
				) {
					setDisplayInfo(true);
				} else {
					setDisplayInfo(false);
				}
			});
		}

		return () => {
			if (map) map.off("moveend");
		};
	}, [onBoarded, outsideAreaMessageSeen, coordinates, map]);

	return displayInfo ? (
		<>
			<div className="info_message col">
				<p>{messageText}</p>
				<div className="row gap-2">
					{onBoarded && (
						<button
							className="primary"
							onClick={() => {
								const zoom = map.getZoom();
								map.flyTo(
									defaultPosition,
									zoom < markerZoomLevel
										? markerZoomLevel
										: zoom,
									{
										duration: 0.5,
									}
								);
								setDisplayInfo(false);
								setOutsideAreaInStorage();
							}}
						>
							{t("infoMessageMoveMeButton")}
						</button>
					)}
					<button
						className="secondary"
						onClick={() => {
							setDisplayInfo(false);
							closeButtonCallback();
						}}
					>
						{t("infoMessageCloseButton")}
					</button>
				</div>
			</div>
			<div className="arrow-right" />
		</>
	) : null;
};

export default LocateMeButtonMessage;
