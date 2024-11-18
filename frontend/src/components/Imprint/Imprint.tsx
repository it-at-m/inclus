import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import "./Imprint.css";

const Imprint = () => {
	const [imprint, setImprint] = useState<string | null>(null);
	const { t } = useTranslation();

	useEffect(() => {
		fetch("/content/imprint.md")
			.then((response) => {
				if (response.ok) {
					return response.text();
				} else {
					return "Hier sollte das Impressum zu finden sein: https://inclus.de/content/imprint.md";
				}
			})
			.then(setImprint);
	}, []);

	return (
		<div className="Imprint">
			<div className="highlight">
				<Link to="/">{t("BackToMap")}</Link>
				<h1>Über uns</h1>
				<p>
					Inclus.de soll allen Menschen schnell und unkompliziert
					Informationen zu barrierefreien Orten zugänglich machen,
					angefangen mit den Örtchen für die dringenden Bedürfnisse in
					München.
				</p>
				<p>
					Die Webseite wurde ursprünglich von einem Team an der
					Digital Product School by UnternehmerTUM im Rahmen der Open
					Source Factory der Stadt München entwickelt. Die Daten und
					Fotos zu den Toiletten stammen vom CBF München e.V.
				</p>
				<p>
					Für Anfragen zum Projekt Inclus.de wenden Sie Sich bitte an
					das Produkt-Team unter{" "}
					<a href="mailto:inclus@EMAIL.DE">inclus@EMAIL.DE</a>
				</p>
			</div>
			{imprint && <Markdown>{imprint}</Markdown>}
		</div>
	);
};

export default Imprint;
