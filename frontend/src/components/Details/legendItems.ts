import { LegendItem } from "state/types";
import blue from "icons/BlueDot.svg";
import red from "icons/RedDot.svg";
import green from "icons/GreenDot.svg";
import yellow from "icons/YellowDot.svg";
import toiletIcon from "icons/Toilet bowl.png";
import urinal from "icons/Urinal.png";
import sink from "icons/Sink.png";
import flex from "icons/FlexHand.png";
import fix from "icons/FixHand.png";
import stand from "icons/Standup.png";
import mobile from "icons/MobCeil.png";
import water from "icons/Water.png";
import turning from "icons/Turning.png";
import barrier from "icons/BarrierFree.png";
import door from "icons/Door.png";

export const handrails = {
	lr: "Flexible Left & Flexible Right",
	l: "Flexible Left",
	rfl: "Fixed Left & Flexible Right",
	flr: "Fixed Left & Flexible Right",
	fr: "Fixed Right",
	none: "No Grip",
	lfr: "Flexible Left & Fixed Right",
	r: "Flexible Right",
	fl: "Fixed Left",
};

// Labels are fed into i18n for translation
export const legendItems: Array<LegendItem> = [
	{ key: "blue", icon: blue, label: "Toilet Flush or tap" },
	{ key: "red", icon: red, label: "Emergency call button or cord" },
	{ key: "green", icon: green, label: "Door button open or close" },
	{ key: "yellow", icon: yellow, label: "Light Switch" },
	{ key: "toiletIcon", icon: toiletIcon, label: "WC Toilet Bowl" },
	{ key: "urinal", icon: urinal, label: "Urinal" },
	{ key: "sink", icon: sink, label: "Sink" },
	{ key: "flex", icon: flex, label: "Flexible Handrails" },
	{ key: "fix", icon: fix, label: "Fixed Handrails" },
	{ key: "stand", icon: stand, label: "Standup Aid" },
	{ key: "mobile", icon: mobile, label: "Mobile ceiling lift" },
	{ key: "water", icon: water, label: "Water Filter with activated carbon" },
	{
		key: "turning",
		icon: turning,
		label: "Turning space in the room and infront of the toilet bowl",
	},
	{ key: "barrier", icon: barrier, label: "Barrier-free shower" },
	{ key: "door", icon: door, label: "Door / WC Bowl handle" },
];
