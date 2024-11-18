import {
  FieldConfig,
  ImportErrorLevel,
  ValidationResult,
  Validator,
} from "./types";
import { Place } from "../types";

export function strip(html: string) {
  // note: this function only works when executed in a browser context
  let doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

export const createPlaceFromCSVLine = async (
  csvLine: Array<string>,
  importConfig: Array<FieldConfig>
) => {
  let place: Partial<Place> = {};
  const errors: Array<string> = [];
  const warnings: Array<string> = [];
  for (let fieldConfig of importConfig) {
    let value = await fieldConfig.getter(csvLine);

    if (fieldConfig.validator) {
      let validationResult: ValidationResult = (
        fieldConfig.validator as Validator
      )(value);

      const errorLevel = fieldConfig.errorLevel;

      if (!validationResult.isValid) {
        if (errorLevel === ImportErrorLevel.ERROR && validationResult.message) {
          errors.push(validationResult.message);
        }
        if (
          errorLevel === ImportErrorLevel.WARNING &&
          validationResult.message
        ) {
          warnings.push(validationResult.message);
        }
      }
    }
    place[fieldConfig.fieldName] = value;
  }
  return { place, errors, warnings };
};

// TODO: remove this to core package utility

const asin = Math.asin;
const cos = Math.cos;
const sin = Math.sin;
const sqrt = Math.sqrt;
const PI = Math.PI;
const R = 6378137;

function squared(x: number) {
  return x * x;
}
function toRad(x: number) {
  return (x * PI) / 180.0;
}
function hav(x: number) {
  return squared(sin(x / 2));
}

function haversineDistance(a: [number, number], b: [number, number]) {
  const aLat = toRad(a[1]);
  const bLat = toRad(b[1]);
  const aLng = toRad(a[0]);
  const bLng = toRad(b[0]);

  const ht = hav(bLat - aLat) + cos(aLat) * cos(bLat) * hav(bLng - aLng);
  return 2 * R * asin(sqrt(ht));
}

export function computeClosestPoints(
  dataPoints: Array<Place>,
  targetPoint: Place,
  numClosest = 5
) {
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
