import { SVGIconProps } from "state/types";

/* eslint-disable max-len */

const Checklist = ({ className, fill }: SVGIconProps) => (
	<svg
		className={className}
		xmlns="http://www.w3.org/2000/svg"
		width={22}
		height={22}
		fill="none"
	>
		<path
			fill={fill || "#AEAEB2"}
			d="M20.23 6.025a3.196 3.196 0 0 0-3.195-3.195h-2.283a3.906 3.906 0 0 0-7.507 0h-2.28A3.196 3.196 0 0 0 1.77 6.025v12.78A3.196 3.196 0 0 0 4.965 22h12.07a3.196 3.196 0 0 0 3.195-3.195V6.025ZM9.225 3.895a1.775 1.775 0 1 1 3.55 0v.71a.355.355 0 0 1-.355.355H9.58a.356.356 0 0 1-.355-.355v-.71Zm8.875 14.91c0 .588-.477 1.065-1.065 1.065H4.965A1.065 1.065 0 0 1 3.9 18.805V6.025c0-.588.477-1.065 1.065-1.065h2.158A2.486 2.486 0 0 0 9.58 7.09h2.84a2.486 2.486 0 0 0 2.457-2.13h2.158c.588 0 1.065.477 1.065 1.065v12.78Z"
		/>
		<path
			fill={fill || "#AEAEB2"}
			d="M10.544 15.762A.828.828 0 0 1 9.95 16a.738.738 0 0 1-.571-.238L7.426 13.81c-.333-.309-.31-.834 0-1.167.308-.332.833-.332 1.166 0L9.949 14l3.762-3.714c.309-.333.833-.333 1.166 0 .333.309.333.833 0 1.166l-4.333 4.31Z"
		/>
	</svg>
);

/* eslint-enable max-len */

export default Checklist;
