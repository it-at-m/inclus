import i18n from "../../../@types/i18n";
import { useState } from "react";
import "./Language.css";

const Language = () => {
	const [lang, setLang] = useState<string>("de");
	function changeLang(ln) {
		setLang(ln);
		i18n.changeLanguage(ln);
	}

	return (
		<div className="Lang">
			<select
				className="rootLang"
				value={lang}
				onChange={(h) => changeLang(h.target.value)}
				placeholder="Lang"
			>
				<option className="menuitem" value={"en"}>
					EN
				</option>
				<option className="menuitem" value={"de"}>
					DE
				</option>
			</select>
		</div>
	);
};

export default Language;
