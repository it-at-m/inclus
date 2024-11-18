import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { imgURL } from "constants/api";

import { PlacesStateContext } from "PlacesContext";
import { PlacesState } from "state/types";
import { legendItems } from "./legendItems";

const DetailFloorplan = () => {
	const { selectedPlace } = useContext(PlacesStateContext) as PlacesState;
	const { t } = useTranslation();
	const [showLegends, setShowLegends] = useState(false);
	const [displayFloorPlan, setDisplayFloorPlan] = useState(
		!!selectedPlace?.plan
	);

	const renderLegendItems = legendItems.map((item) => {
		const label: unknown = item.label;
		return (
			<div
				key={item.key}
				className="Legend-Item"
				style={{ backgroundImage: `url(${item.icon})` }}
			>
				{t(label as TemplateStringsArray)}
			</div>
		);
	});

	useEffect(() => {
		setDisplayFloorPlan(!!selectedPlace?.plan);
	}, [selectedPlace]);

	return displayFloorPlan ? (
		<div className="Card Floorplan col align-stretch">
			<img
				src={`${imgURL}${selectedPlace?.plan}`}
				alt={t("floorPlanAlt")}
				onError={() => {
					setDisplayFloorPlan(false);
				}}
			/>
			<div
				className={`Legend col gap-1 ${
					showLegends ? "open" : "closed"
				}`}
			>
				{renderLegendItems}
			</div>
			<button
				type="button"
				className="secondary"
				onClick={() => setShowLegends(!showLegends)}
			>
				{showLegends ? t("Hide legend") : t("Show legend")}
			</button>
		</div>
	) : null;
};

export default DetailFloorplan;
