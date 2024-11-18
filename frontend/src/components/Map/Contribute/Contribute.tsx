import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./Contribute.css";
import React, { useCallback, useState } from "react";
import Close from "icons/Close";
import AddIcon from "icons/Plus";
import MailIcon from "icons/Mail";
import ChecklistIcon from "icons/Checklist";

const Contribute = () => {
	const { t } = useTranslation();
	const [displayOptions, setDisplayOptions] = useState<boolean>(false);

	const toggleDisplayOptions = useCallback(
		() => setDisplayOptions(!displayOptions),
		[displayOptions]
	);

	return (
		<div className="Contribute">
			{displayOptions ? (
				<div className="col options">
					<div className="row align-center justify-between">
						<h3>{t("We need your help")}</h3>
						<button
							type="button"
							className="icon-only"
							onClick={toggleDisplayOptions}
						>
							<Close />
						</button>
					</div>
					<Link to="/wc/add-new" className="button primary with-icon">
						<AddIcon fill="#fff" />
						{t("Add a restroom")}
					</Link>
					<Link
						to="/volunteer/signup"
						className="button primary with-icon"
					>
						<ChecklistIcon fill="#fff" />
						{t("Do inspections")}
					</Link>
					<a
						href={`mailto:?subject=${t(
							"mailShareSubject"
						)}&body=${t("mailShareBody")}`}
						className="button primary with-icon"
					>
						<MailIcon fill="#fff" />
						{t("Spread the word")}
					</a>
				</div>
			) : (
				<button
					type="button"
					className="map-control toggle"
					onClick={toggleDisplayOptions}
				>
					{t("Contribute")}
				</button>
			)}
		</div>
	);
};

export default Contribute;
