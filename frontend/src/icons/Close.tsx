import { SVGIconProps } from "state/types";

/* eslint-disable max-len */

const Close = ({ className, fill }: SVGIconProps) => (
	<svg
		className={className}
		width={22}
		height={23}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M11 .267a10.998 10.998 0 1 0 0 22 10.998 10.998 0 0 0 11-11 11.012 11.012 0 0 0-11-11Zm4.382 7.407-3.594 3.593 3.594 3.593a.558.558 0 0 1-.788.789L11 12.055l-3.593 3.594a.557.557 0 0 1-.788-.788l3.594-3.594-3.594-3.593a.559.559 0 0 1 .788-.789L11 10.48l3.594-3.594a.558.558 0 0 1 .788.79Z"
			fill={fill || "#AEAEB2"}
		/>
	</svg>
);

/* eslint-enable max-len */

export default Close;
