import { SVGIconProps } from "state/types";

/* eslint-disable max-len */

const Plus = ({ className, fill }: SVGIconProps) => (
	<svg
		className={className}
		width={22}
		height={22}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M11 1a1.5 1.5 0 0 0-1.5 1.5v7h-7a1.5 1.5 0 0 0 0 3h7v7a1.5 1.5 0 0 0 3 0v-7h7a1.5 1.5 0 0 0 0-3h-7v-7A1.5 1.5 0 0 0 11 1Z"
			fill={fill || "#AEAEB2"}
		/>
	</svg>
);

/* eslint-enable max-len */

export default Plus;
