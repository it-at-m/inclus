import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { PlacesStateContext } from "PlacesContext";
import { PlacesState } from "state/types";
import { Place } from "types/place";
import IconAddInfo from "icons/AddInfo";
import IconMail from "icons/Mail";
import ClosestPlaceListItem from "./ClosestPlaceListItem";

const decodeHtmlEntities = (text: string) => {
	const parser = new DOMParser();
	const dom = parser.parseFromString(
		`<!doctype html><body>${text}`,
		"text/html"
	);
	return dom.body.textContent || "";
};

const DetailDescription = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { places, selectedPlace } = useContext(
		PlacesStateContext
	) as PlacesState;

	let closestToilets: Place[] = [];

	if (
		selectedPlace &&
		selectedPlace.closest_toilets &&
		selectedPlace.closest_toilets.length > 0
	) {
		closestToilets = places.filter((place) =>
			selectedPlace.closest_toilets?.find(
				(entry) => entry.id === place.id
			)
		);
	}

	return (
		<div className="DetailDescription col gap-2">
			{selectedPlace?.direction && (
				<>
					<h3>{t("Indoor Navigation to the toilet")}</h3>
					<p>{decodeHtmlEntities(selectedPlace.direction)}</p>
				</>
			)}
			{selectedPlace?.access && (
				<>
					<h3>{t("Access to the toilet")}</h3>
					<p>{decodeHtmlEntities(selectedPlace.access)}</p>
				</>
			)}

			{selectedPlace?.interior_description && (
				<>
					<h3>{t("Interior Description")}</h3>
					<p>
						{decodeHtmlEntities(selectedPlace.interior_description)}
					</p>
				</>
			)}

			<br />

			<button
				type="button"
				className="primary with-icon"
				onClick={() => navigate("report-problem")}
			>
				<IconMail fill="#fff" />
				{t("Report a problem")}
			</button>
			<button
				type="button"
				className="secondary with-icon"
				onClick={() => navigate("add-information")}
			>
				<IconAddInfo fill="#6F5AF2" />
				{t("Update information")}
			</button>

			<br />

			<h3>{t("Other toilets around you")}</h3>
			<ul className="ListDistances">
				{closestToilets.map((wc) => (
					<ClosestPlaceListItem key={wc.id} place={wc} />
				))}
			</ul>

			<br />

			<p>
				{t("Kindly Provided By")}{" "}
				<a
					href="https://www.cbf-muenchen.de/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<b>CBF München</b>
				</a>{" "}
				{t("Last Updated")}: {selectedPlace?.modified}
			</p>
		</div>
	);
};

export default DetailDescription;
