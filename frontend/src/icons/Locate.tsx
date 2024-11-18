import { SVGIconProps } from "state/types";

/* eslint-disable max-len */

const Locate = ({ className, fill }: SVGIconProps) => (
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
			d="M19.133 9.625h1.492a1.374 1.374 0 1 1 0 2.75h-1.492a8.26 8.26 0 0 1-2.3 4.458 8.26 8.26 0 0 1-4.458 2.3v1.492a1.374 1.374 0 1 1-2.75 0v-1.492a8.26 8.26 0 0 1-4.458-2.3 8.26 8.26 0 0 1-2.3-4.458H1.375a1.374 1.374 0 1 1 0-2.75h1.492a8.26 8.26 0 0 1 2.3-4.458 8.26 8.26 0 0 1 4.458-2.3V1.375a1.374 1.374 0 1 1 2.75 0v1.492a8.26 8.26 0 0 1 4.458 2.3 8.26 8.26 0 0 1 2.3 4.458ZM7.112 14.889a5.5 5.5 0 1 0 7.779-7.777 5.5 5.5 0 0 0-7.78 7.777ZM12.375 11c0 1.833-2.75 1.833-2.75 0s2.75-1.833 2.75 0Z"
			fill={fill || "#6F5AF2"}
		/>
	</svg>
);

/* eslint-enable max-len */

export default Locate;
