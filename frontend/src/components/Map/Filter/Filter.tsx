import { useContext } from "react";
import { useTranslation } from "react-i18next";

import { DoorWidths, EuroKeyValues, RampValues } from "types/enums";
import { PlacesActions } from "state/actions";
import { PlacesDispatchContext, PlacesStateContext } from "PlacesContext";
import "./Filter.css";
import { PlacesState, FilterValue } from "state/types";

const Filter = () => {
	const { t } = useTranslation();
	const {
		filterValue: { euroKey, doorWidth, rampVal },
		selectedPlace,
	} = useContext(PlacesStateContext) as PlacesState;

	const dispatch = useContext(PlacesDispatchContext);

	const onChangeFilter = (name: string, value) => {
		const filterValue: FilterValue = {
			euroKey,
			doorWidth,
			rampVal,
		};
		filterValue[name] = Number(value);

		dispatch({
			type: PlacesActions.FILTER_PLACES,
			payload: {
				filterValue,
			},
		});
	};

	return (
		<div className="filter-container">
			<div
				className={`Filter wrapper ${
					selectedPlace ? "selectedPlace" : ""
				}`}
			>
				<select
					className={`selectButton ${
						euroKey === EuroKeyValues.NOT_SELECTED
							? "notSelected"
							: ""
					}`}
					value={euroKey}
					onChange={(e) => onChangeFilter("euroKey", e.target.value)}
					placeholder="Euro Key"
				>
					<option
						id="None"
						className="menuitem"
						value={EuroKeyValues.NOT_SELECTED}
					>
						{t("EuroKey")}
					</option>
					<option
						id="EuroKeyYes"
						className="menuitem"
						value={EuroKeyValues.YES}
					>
						{t("Yes")}
					</option>
					<option
						id="EuroKeyNo"
						className="menuitem"
						value={EuroKeyValues.NO}
					>
						{t("No")}
					</option>
				</select>

				<select
					className={`selectButton ${
						rampVal === RampValues.NOT_SELECTED ? "notSelected" : ""
					}`}
					id="Ramp"
					value={rampVal}
					onChange={(g) => {
						onChangeFilter("rampVal", g.target.value);
					}}
				>
					<option value={RampValues.NOT_SELECTED}>{t("Ramp")}</option>
					<option value={RampValues.NO_RAMP} className="menuitem">
						{t("No Ramp")} (0 %)
					</option>
					<option
						value={RampValues.ACCESSIBLE_RAMP}
						className="menuitem"
					>
						{t("Accessible Ramp")} (1 - 6 %)
					</option>
				</select>

				<select
					className={`selectButton ${
						doorWidth === DoorWidths.NOT_SELECTED
							? "notSelected"
							: ""
					}`}
					value={doorWidth}
					onChange={(f) =>
						onChangeFilter("doorWidth", f.target.value)
					}
					id="DoorWidth"
				>
					<option value={DoorWidths.NOT_SELECTED}>
						{t("Door width")}
					</option>
					<option
						id="Door80cm"
						value={DoorWidths.DOOR_WIDTH_80}
						className="menuitem"
					>
						min. 80cm
					</option>
					<option
						id="Door90cm"
						value={DoorWidths.DOOR_WIDTH_90}
						className="menuitem"
					>
						min. 90cm
					</option>
					<option
						id="Door100cm"
						value={DoorWidths.DOOR_WIDTH_100}
						className="menuitem"
					>
						min. 100cm
					</option>
				</select>
			</div>
		</div>
	);
};

export default Filter;
