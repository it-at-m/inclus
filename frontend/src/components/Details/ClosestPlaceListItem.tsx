import React, { useContext } from "react";
import { PlacesDispatchContext, PlacesStateContext } from "../../PlacesContext";
import { PlacesState } from "../../state/types";
import { PlacesActions } from "../../state/actions";
import va from "@vercel/analytics";
import {
	AnalyticsEvents,
	PlaceDetailsEventSources,
} from "../../constants/analytics";

const ClosestPlaceListItem = ({ place }) => {
	const { selectedPlace } = useContext(PlacesStateContext) as PlacesState;
	const dispatch = useContext(PlacesDispatchContext);

	const info =
		selectedPlace &&
		selectedPlace.closest_toilets?.find((entry) => place.id === entry.id);

	let distance = info ? info.distance : -1;
	let unit = "m";

	if (distance > 1000) {
		distance = Number((distance / 1000).toFixed(1));
		unit = "km";
	}

	const selectPlace = () => {
		dispatch({
			type: PlacesActions.SET_SELECTED_PLACE,
			payload: { selectedPlaceId: place.id },
		});

		va.track(AnalyticsEvents.PLACE_DETAILS_EVENT, {
			selectedPlaceId: place.id,
			source: PlaceDetailsEventSources.NEAREST,
		});
	};

	return (
		<li key={`wc${place.id}`} className="row">
			<div className="DetailsNearestPlace grow" onClick={selectPlace}>
				{place.title}
			</div>
			{distance >= 0 && (
				<span>
					{distance}&nbsp;{unit}&ensp;
				</span>
			)}
		</li>
	);
};

export default ClosestPlaceListItem;
