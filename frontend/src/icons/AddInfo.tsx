import { SVGIconProps } from "state/types";

/* eslint-disable max-len */

const AddInfo = ({ className, fill }: SVGIconProps) => (
	<svg
		className={className}
		width={22}
		height={21}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M19.718 1.582A4.374 4.374 0 0 1 21 4.675V7.8a1.25 1.25 0 1 1-2.5 0V4.675c0-1.035-.84-1.875-1.875-1.875H5.375C4.34 2.8 3.5 3.64 3.5 4.675v11.25c0 1.035.84 1.875 1.875 1.875H8.5a1.25 1.25 0 1 1 0 2.5H5.375A4.376 4.376 0 0 1 1 15.925V4.675A4.376 4.376 0 0 1 5.375.3h11.25c1.16 0 2.273.461 3.093 1.282Zm-5.28 9.968a1.25 1.25 0 1 1 2.5 0v2.188h2.187a1.25 1.25 0 1 1 0 2.5h-2.188v2.187a1.25 1.25 0 1 1-2.5 0v-2.188H12.25a1.25 1.25 0 1 1 0-2.5h2.188V11.55Z"
			fill={fill || "#AEAEB2"}
		/>
	</svg>
);

/* eslint-enable max-len */

export default AddInfo;
