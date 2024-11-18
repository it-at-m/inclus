import { useContext, useState } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import { useTranslation } from "react-i18next";
import "leaflet-geosearch/dist/geosearch.css";

import { PlacesState } from "state/types";
import { defaultPosition } from "constants/geo";
import { mapboxToken } from "constants/api";

import Language from "./Language";
import Filter from "./Filter";
import SearchControl from "./Search/SearchControl";
import Details from "../Details";
import Places from "./Places";
import Legal from "./Legal";
import { PlacesStateContext } from "PlacesContext";
import "./Map.css";
import Contribute from "./Contribute";
import LocateMeButton from "./Controls/LocateMeButton";
import PlaceList from "components/Map/PlaceList";

const Map = () => {
	const { selectedPlace, nearestPlaces } = useContext(
		PlacesStateContext
	) as PlacesState;
	const { t } = useTranslation();

	// handle PlaceList open/close
	const [isOpenPlaceList, setIsOpenPlaceList] = useState(true);

	const displayNearestPlaces =
		nearestPlaces && nearestPlaces?.length && !selectedPlace;

	// handle margin-bottom of zoom control
	const getZoomControlNarginBottom = () => {
		if (displayNearestPlaces) {
			if (isOpenPlaceList) {
				if (nearestPlaces?.length === 1) {
					return "margin-bottom-one-items";
				} else if (nearestPlaces?.length >= 2) {
					return "margin-bottom-two-items";
				}
			} else {
				return "margin-bottom-zero-items";
			}
		}
		return "";
	};

	return (
		<div className={`map__container ${getZoomControlNarginBottom()}`}>
			<div className="TitleBarMobile">{t("BarrierfreeToilets")}</div>
			<MapContainer
				center={defaultPosition}
				zoom={25}
				scrollWheelZoom={true}
				style={{ height: "100%" }}
				zoomControl={false}
				attributionControl={false}
			>
				<TileLayer
					url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`}
					tileSize={512}
					zoomOffset={-1}
				/>
				<SearchControl />
				<Filter />
				<Language />
				<LocateMeButton displayNearestPlaces={displayNearestPlaces} />
				<ZoomControl
					position="bottomright"
					zoomInText="+"
					zoomOutText="-"
				/>
				<Places />
				<Contribute />
				{displayNearestPlaces && (
					<PlaceList
						isOpen={isOpenPlaceList}
						setIsOpen={setIsOpenPlaceList}
					/>
				)}
			</MapContainer>
			<Legal />
			{selectedPlace && <Details />}
		</div>
	);
};

export default Map;
