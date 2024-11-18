import { useNavigate } from "react-router";
import { Widget } from "@typeform/embed-react";
import { REPORT_PROBLEM } from "../../constants/forms";

import "./Forms.css";
import { useSelectedToiletFromMatch } from "../../hooks/useSelectedToiletFromMatch";

const ReportProblem = () => {
	const selectedPlace = useSelectedToiletFromMatch("/wc/:id/report-problem");

	const navigate = useNavigate();

	const navigateBack = () =>
		selectedPlace ? navigate(`/wc/${selectedPlace.id}`) : navigate("/");

	return (
		<Widget
			id={REPORT_PROBLEM}
			className="Form embedded"
			hidden={{
				wd_id: selectedPlace?.id + "" || "0",
				wc_title: selectedPlace?.title || "Unbekannte Toilette",
			}}
			onEndingButtonClick={navigateBack}
			onClose={navigateBack}
			inlineOnMobile
		/>
	);
};

export default ReportProblem;
