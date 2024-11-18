import L from "leaflet";

export const toiletIcon = L.icon({
	iconSize: [34, 34],
	iconAnchor: [17, 34],
	popupAnchor: [0, -20],
	tooltipAnchor: [0, -20],
	shadowAnchor: [14, 39],
	iconUrl: "/images/toilet-icon.svg",
	shadowUrl: "/images/marker-shadow.png",
});

export const selectedToiletIcon = L.icon({
	iconSize: [34, 34],
	iconAnchor: [17, 34],
	popupAnchor: [0, -20],
	tooltipAnchor: [0, -20],
	shadowAnchor: [14, 39],
	iconUrl: "/images/selected-toilet-icon.svg",
	shadowUrl: "/images/marker-shadow.png",
});

export const trackerIcon = L.icon({
	iconSize: [48, 48],
	iconUrl: "/images/tracker-icon.svg",
});
