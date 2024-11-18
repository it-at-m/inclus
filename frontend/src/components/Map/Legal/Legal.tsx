import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Legal.css";

const Legal = () => {
	const { t } = useTranslation();

	return (
		<div className="Legal row">
			<Link to="/imprint">{t("Imprint")}</Link>
			<Link to="/privacy">{t("Privacy")}</Link>
			<div className="grow">&emsp;</div>
			{t("Map Data")}: ©
			<a href="https://www.cbf-muenchen.de/">CBF München</a> ©
			<a href="https://www.mapbox.com/feedback/">Mapbox</a> ©
			<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>
		</div>
	);
};

export default Legal;
