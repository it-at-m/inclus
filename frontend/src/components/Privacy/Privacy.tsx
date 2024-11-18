import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import "./Privacy.css";

const Privacy = () => {
	const [privacyDisclaimer, setPrivacyDisclaimer] = useState<string | null>(
		null
	);
	const { t } = useTranslation();

	useEffect(() => {
		fetch("/content/privacy-disclaimer.md")
			.then((response) => {
				if (response.ok) {
					return response.text();
				} else {
					return "Hier sollte die Datenschutzerklärung zu finden sein: https://inclus.de/content/privacy-disclaimer.md";
				}
			})
			.then(setPrivacyDisclaimer);
	}, []);

	return (
		<div className="Privacy">
			<Link to="/">{t("BackToMap")}</Link>
			{privacyDisclaimer && <Markdown>{privacyDisclaimer}</Markdown>}
		</div>
	);
};

export default Privacy;
