import { SVGIconProps } from "state/types";

/* eslint-disable max-len */
const Minus = ({ className, fill }: SVGIconProps) => (
	<svg
		className={className}
		width={22}
		height={21}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<rect
			x={21}
			y={9}
			width={3}
			height={20}
			rx={1.5}
			transform="rotate(90 21 9)"
			fill={fill || "#6F5AF2"}
		/>
	</svg>
);
/* eslint-enable max-len */
export default Minus;
