import { useNavigate } from "react-router";
import { Widget } from "@typeform/embed-react";
import { ADD_TOILET } from "../../constants/forms";

import "./Forms.css";

const AddInformation = () => {
	const navigate = useNavigate();
	const navigateBack = () => navigate("/");

	return (
		<Widget
			id={ADD_TOILET}
			className="Form embedded"
			onEndingButtonClick={navigateBack}
			onClose={navigateBack}
			inlineOnMobile
		/>
	);
};

export default AddInformation;
