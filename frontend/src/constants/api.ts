export const apiUri = "https://backend.inclus.de/";
export const filterApi = apiUri + "filter/";
export const ReviewApi = apiUri + "review";
export const PhotoApi = apiUri + "loadphoto";
export const imgURL = "https://storage.googleapis.com/dps-inclus/";
export const dataCacheUrl = "/data/cache-munich.json";
export const mapboxToken =
	window.location.hostname === "inclus.de" ||
	window.location.hostname === "www.inclus.de"
		? "pk.eyJ1IjoibWFyY3VzLWRwcyIsImEiOiJjbGU4YzBvMHIwOWF2M3ZscmJuazhlOHJkIn0.CU9coc5nZAhCLpqDsitSzA"
		: "pk.eyJ1IjoibWFyY3VzLWRwcyIsImEiOiJjbGhxNjl4eTEwZGQyM2NtZjAzajh6ZDdpIn0.wu7tABjuQIWSFHHG_eJiTw";

export const googleMapsDirectionsURL =
	"https://www.google.com/maps/dir/?api=1&destination=";
