import React, { FC, memo } from "react";
import { selectedToiletIcon, toiletIcon } from "constants/icons";
import { Marker, Tooltip } from "react-leaflet";
import { Place } from "../../../types/place";

type PlaceComponentProperties = {
	place: Place;
	isSelected: boolean;
	selectPlace: (placeId: number) => void;
};
const PlaceComponent: FC<PlaceComponentProperties> = ({
	place,
	isSelected,
	selectPlace,
}) => {
	const currentIcon = isSelected ? selectedToiletIcon : toiletIcon;
	return (
		<Marker
			key={place.title}
			position={place.position}
			eventHandlers={{ click: () => selectPlace(place.id) }}
			icon={currentIcon}
		>
			<Tooltip>{place.title}</Tooltip>
		</Marker>
	);
};

export default memo(PlaceComponent, (prevProps, nextProps) => {
	return (
		prevProps.isSelected === nextProps.isSelected &&
		prevProps.place.id === nextProps.place.id
	);
});
