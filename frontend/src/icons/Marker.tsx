import { SVGIconProps } from "state/types";

/* eslint-disable max-len */
const Marker = ({ className, fill }: SVGIconProps) => (
	<svg
		className={className}
		xmlns="http://www.w3.org/2000/svg"
		width={22}
		height={22}
		fill="none"
	>
		<path
			stroke={fill || "#AEAEB2"}
			strokeWidth={3}
			d="M18.085 9.113c0 2.344-.92 4.094-2.43 5.882-.77.912-1.668 1.804-2.67 2.793l-.084.084c-.61.602-1.253 1.237-1.901 1.914-.648-.677-1.29-1.312-1.901-1.914l-.084-.084c-1.002-.989-1.9-1.88-2.67-2.793-1.51-1.788-2.43-3.538-2.43-5.882C3.915 4.823 7.17 1.5 11 1.5s7.085 3.323 7.085 7.613Z"
		/>
	</svg>
);

/* eslint-enable max-len */
export default Marker;
