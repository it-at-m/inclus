import { SVGIconProps } from "state/types";

/* eslint-disable max-len */

const Mail = ({ className, fill }: SVGIconProps) => (
	<svg
		className={className}
		width={22}
		height={15}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M1.65 0c-.216 0-.421.045-.61.12l9.333 8.156c.404.352.833.352 1.237 0L20.96.12a1.647 1.647 0 0 0-.61-.12H1.65ZM.017 1.418A1.65 1.65 0 0 0 0 1.65v11c0 .914.736 1.65 1.65 1.65h18.7c.914 0 1.65-.736 1.65-1.65v-11c0-.078-.006-.157-.017-.232l-9.29 8.104a2.599 2.599 0 0 1-3.403 0L.017 1.418Z"
			fill={fill || "#AEAEB2"}
		/>
	</svg>
);

/* eslint-enable max-len */

export default Mail;
