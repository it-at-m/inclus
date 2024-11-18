import { expect, test } from "vitest";
import { createPlaceFromCSVLine } from "../../src/DataImport/utils";
import {
  invalidAdditionalFieldsCSVLineArray,
  invalidCSVLineArray,
  validCSVLineArray,
  warningsCSVLineArray,
} from "../mocks/DataImport/cbfMocks";
import { mappings as CBFMappings } from "../../src/DataImport/mappings/cbfImport";

test("parses a valid cbf export csv line into a valid place object", async () => {
  const { place, errors, warnings } = await createPlaceFromCSVLine(
    validCSVLineArray,
    CBFMappings
  );

  expect(errors).toHaveLength(0);
  expect(warnings).toHaveLength(0);
  expect(place).toMatchSnapshot();
});

test("reports errors if no id, title, position and short_description was submitted", async () => {
  const { errors } = await createPlaceFromCSVLine(
    invalidCSVLineArray,
    CBFMappings
  );
  expect(errors).toMatchSnapshot();
});

test("reports errors for eurokey, ramp, grip and door_width values", async () => {
  const { errors } = await createPlaceFromCSVLine(
    invalidAdditionalFieldsCSVLineArray,
    CBFMappings
  );
  expect(errors).toMatchSnapshot();
});

test("parses a cbf csv line with warnings", async () => {
  const { warnings } = await createPlaceFromCSVLine(
    warningsCSVLineArray,
    CBFMappings
  );
  expect(warnings).toMatchSnapshot();
});
