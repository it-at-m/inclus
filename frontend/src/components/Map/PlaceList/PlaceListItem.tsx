import { FC } from "react";
import { useTranslation } from "react-i18next";
import { formatDistance } from "util/geoUtils";
import { PlaceListItemType } from "./types";

import "./PlaceListItem.css";

const PlaceListItem: FC<PlaceListItemType> = ({
	itemProps,
	className,
	onClick,
	title,
	address,
	distance,
	Icon,
}) => {
	const { t } = useTranslation();

	return (
		<li
			{...itemProps}
			className={`PlaceListItem grid ${className ?? ""}`}
			role="button"
			onClick={onClick}
		>
			<Icon fill="#6F5AF2" className="grid-icon" />
			<div className="grid-title">{title}</div>
			<div className="grid-address">
				{distance && (
					<span aria-label={t("Distance")}>
						{formatDistance(distance)} &middot;{" "}
					</span>
				)}
				{address}
			</div>
		</li>
	);
};

export default PlaceListItem;
