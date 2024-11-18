import { useContext } from "react";
import { useTranslation } from "react-i18next";

import key_logo from "icons/eurokey.svg";
import handrails_logo from "icons/handrailS.svg";
import ramp_logo from "icons/ramp.svg";
import door_logo from "icons/door width.svg";

import { PlacesStateContext } from "PlacesContext";
import { PlacesState } from "state/types";

export const handrails = {
	lr: "Flexible Left & Flexible Right",
	l: "Flexible Left",
	rfl: "Fixed Left & Flexible Right",
	flr: "Fixed Left & Flexible Right",
	fr: "Fixed Right",
	none: "No Grip",
	lfr: "Flexible Left & Fixed Right",
	r: "Flexible Right",
	fl: "Fixed Left",
};

const DetailSummary = () => {
	const { selectedPlace } = useContext(PlacesStateContext) as PlacesState;
	const { t } = useTranslation();

	const renderEuroKey = () => {
		switch (selectedPlace?.eurokey) {
			case 1:
				return t("Required");
			case 0:
				return t("Not Required");
			case "ka":
				return t("No Info");
			default:
				return t("No Info");
		}
	};

	const renderRamp = () => {
		if (
			selectedPlace?.ramp_steepness &&
			selectedPlace.ramp_steepness !== "0"
		) {
			return (
				<div>
					<span>
						{t("Ramp Steepness")}:{" "}
						<b>{selectedPlace?.ramp_steepness}%</b>
					</span>
					{selectedPlace?.ramp_length && (
						<span>
							, {t("Ramp Length")}:{" "}
							<b>{selectedPlace?.ramp_length}m</b>
						</span>
					)}
				</div>
			);
		} else {
			return <span>{t("No Ramp")}</span>;
		}
	};

	return (
		<div className="DetailSummary col gap-2">
			<p>{selectedPlace?.short_description}</p>

			<div className="row gap align-center">
				<img src={key_logo} alt={"eurokey"}></img>
				<span>
					{t("Eurokey")}: <b>{renderEuroKey()}</b>
				</span>
			</div>
			<div className="row gap align-center">
				<img src={ramp_logo} alt={"Ramp Gradient"}></img>
				<span>{renderRamp()}</span>
			</div>
			{selectedPlace?.door_width && (
				<div className="row gap align-center">
					<img src={door_logo} alt={"Door width"}></img>
					<span>
						{t("Door width")}: <b>{selectedPlace?.door_width}cm</b>
					</span>
				</div>
			)}
			<div className="row gap align-center">
				<img src={handrails_logo} alt={"handrail"}></img>
				<span>
					{t("Handrails")}:{" "}
					<b>{t(handrails[`${selectedPlace?.grip}`])}</b>
				</span>
			</div>
		</div>
	);
};

export default DetailSummary;
