import { useNavigate } from "react-router";
import { Widget } from "@typeform/embed-react";
import { VOLUNTEER } from "../../constants/forms";

import "./Forms.css";

const VolunteerSignup = () => {
	const navigate = useNavigate();
	const navigateBack = () => navigate("/");

	return (
		<Widget
			id={VOLUNTEER}
			className="Form embedded"
			onEndingButtonClick={navigateBack}
			onClose={navigateBack}
			inlineOnMobile
		/>
	);
};

export default VolunteerSignup;
