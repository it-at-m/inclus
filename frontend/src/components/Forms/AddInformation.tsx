import { useNavigate } from "react-router";
import { Widget } from "@typeform/embed-react";

import "./Forms.css";
import { useSelectedToiletFromMatch } from "../../hooks/useSelectedToiletFromMatch";
import { ADD_INFORMATION } from "../../constants/forms";

const AddInformation = () => {
	const selectedPlace = useSelectedToiletFromMatch("/wc/:id/add-information");

	const navigate = useNavigate();

	const navigateBack = () =>
		selectedPlace ? navigate(`/wc/${selectedPlace.id}`) : navigate("/");

	return (
		<Widget
			id={ADD_INFORMATION}
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

export default AddInformation;
