import fs from "fs";

const asin = Math.asin;
const cos = Math.cos;
const sin = Math.sin;
const sqrt = Math.sqrt;
const PI = Math.PI;
const R = 6378137;

const numberOfClosestToilets = 3;

function squared(x) {
	return x * x;
}
function toRad(x) {
	return (x * PI) / 180.0;
}
function hav(x) {
	return squared(sin(x / 2));
}

function haversineDistance(a, b) {
	const aLat = toRad(a[1]);
	const bLat = toRad(b[1]);
	const aLng = toRad(a[0]);
	const bLng = toRad(b[0]);

	const ht = hav(bLat - aLat) + cos(aLat) * cos(bLat) * hav(bLng - aLng);
	return 2 * R * asin(sqrt(ht));
}

function readJsonFile(filePath) {
	return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function computeClosestPoints(dataPoints, targetPoint, numClosest = 5) {
	const distances = dataPoints.map((point) => ({
		point,
		distance:
			point !== targetPoint
				? haversineDistance(targetPoint.position, point.position)
				: Infinity,
	}));

	distances.sort((a, b) => a.distance - b.distance);

	return distances.slice(0, numClosest);
}

function updateClosestLocations(dataPoints) {
	for (const point of dataPoints) {
		const closestPoints = computeClosestPoints(
			dataPoints,
			point,
			numberOfClosestToilets
		);

		point["closest_toilets"] = closestPoints.map((cp) => ({
			id: cp.point.id,
			distance: Math.round(cp.distance),
		}));
	}
}

function writeJsonFile(filePath, data) {
	fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function main() {
	/* eslint-disable no-undef */
	const file_path = `${process.cwd()}/public/data/cache-munich.json`;
	const data_points = readJsonFile(file_path);

	// Run calculations and modify data_points
	updateClosestLocations(data_points);

	// Write result back to the file
	writeJsonFile(file_path, data_points);
	console.log("Nearest toilets calculated and added to cache-munich.json\n");
}

main();
