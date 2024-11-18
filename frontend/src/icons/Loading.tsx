import { SVGIconProps } from "state/types";

/* eslint-disable max-len */

const Loading = ({ className }: SVGIconProps) => (
	<svg
		className={className}
		width={22}
		height={22}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M19.722 6.107a1.464 1.464 0 0 0-2.552 1.434 7.075 7.075 0 0 1-6.172 10.532C7.1 18.073 3.927 14.9 3.927 11 3.927 7.1 7.1 3.927 11 3.927c.858 0 1.697.152 2.492.45a1.462 1.462 0 1 0 1.03-2.738A9.987 9.987 0 0 0 11 1C5.486 1 1 5.486 1 11s4.486 10 10 10 10-4.485 10-10c0-1.715-.443-3.407-1.278-4.893Z"
			fill="url(#a)"
		/>
		<defs>
			<radialGradient
				id="a"
				cx={0}
				cy={0}
				r={1}
				gradientUnits="userSpaceOnUse"
				gradientTransform="matrix(5.44407 -6.73565 7.00742 5.66374 11 11)"
			>
				<stop stopColor="#AD68E3" />
				<stop offset={1} stopColor="#4963ED" />
			</radialGradient>
		</defs>
	</svg>
);

/* eslint-enable max-len */

export default Loading;
