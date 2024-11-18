import { useContext, useEffect, useState } from "react";
import { imgURL } from "constants/api";

import { PlacesStateContext } from "PlacesContext";
import { PlacesState } from "state/types";
import { useTranslation } from "react-i18next";

const DetailPhotos = () => {
	const { selectedPlace } = useContext(PlacesStateContext) as PlacesState;
	const [displayPhoto, setDisplayPhoto] = useState(!!selectedPlace?.photo);
	const { t } = useTranslation();

	useEffect(() => {
		setDisplayPhoto(!!selectedPlace?.photo);
	}, [selectedPlace]);

	return displayPhoto ? (
		<div className="DetailPhotos row gap scroll-x">
			<img
				src={`${imgURL}${selectedPlace?.photo}`}
				alt={`${t("PhotoOf")} ${selectedPlace?.title}`}
				onError={() => {
					setDisplayPhoto(false);
				}}
			/>
		</div>
	) : null;
};

export default DetailPhotos;
