import { FC } from "react";
import { LatLngExpression } from "leaflet";
import { SVGIconProps } from "state/types";

export interface PlaceListItemType {
	itemProps?: any;
	className?: string;
	onClick: any;
	title: string;
	address: string;
	distance?: number;
	Icon: FC<SVGIconProps>;
}
