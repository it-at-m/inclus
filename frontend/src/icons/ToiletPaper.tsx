import { SVGIconProps } from "state/types";

/* eslint-disable max-len */

const ToiletPaper = ({ className, fill }: SVGIconProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className={className}
		width={22}
		height={23}
		aria-hidden="true"
	>
		<path
			fill={fill || "#AEAEB2"}
			d="M17.298.977H4.764C2.517.977.626 3.726.124 7.568c-.17 1.567-.17 2.454.03 4.02.491 3.849 2.395 6.593 4.612 6.593h3.192v3.192c0 .207.118.414.296.533.178.117.413.117.621.03l3.045-1.508 1.803 1.448a.692.692 0 0 0 .385.147c.089 0 .148-.03.237-.058l1.891-.74 1.656.74c.089.03.178.058.265.058h3.193c.354 0 .65-.295.65-.65L21.998 9.49c0-4.877-2.011-8.513-4.7-8.513Zm-9.34 15.961H6.952c.561-.59.622-.683 1.006-1.659v1.66ZM5 16.968h-.236c-1.537 0-2.986-2.512-3.37-5.733h1.361l-.01-.06c.266 1.537.857 2.75 1.804 2.75 1.27 0 1.951-2.247 1.951-4.434 0-2.187-.68-4.434-1.951-4.434-.976 0-1.596 1.33-1.833 2.956h-1.35c.326-3.251 1.804-5.734 3.4-5.734h.264c1.596.798 2.75 3.725 2.75 7.242 0 3.546-1.213 6.62-2.78 7.447Zm15.726 3.783h-2.424l-1.803-.798a.735.735 0 0 0-.503 0l-1.773.709-1.833-1.478c-.206-.148-.473-.178-.68-.059l-2.482 1.242V9.492c0-3.134-.887-5.823-2.247-7.242h10.345c1.656 0 3.4 2.897 3.4 7.242v11.26Z"
		/>
	</svg>
);

/* eslint-enable max-len */

export default ToiletPaper;
