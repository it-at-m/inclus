import { strip } from "./utils";

export const getStringByArrayIndex =
  (arrayIndex: number) => (csvLine: Array<string>) => {
    return strip(csvLine[arrayIndex]);
  };

export const getNumberByArrayIndex =
  (arrayIndex: number) => (csvLine: Array<string>) => {
    return Number(csvLine[arrayIndex]);
  };

export const getAdditionalField =
  (additionalFieldName: string) => async (csvLine: Array<string>) => {
    const additionalFields = await JSON.parse(csvLine[25]);
    return strip(additionalFields[additionalFieldName]);
  };

export const getEuroKey = async (csvLine: Array<string>) => {
  const additionalFields = await JSON.parse(csvLine[25]);
  let value = strip(additionalFields["wc_euro"]);
  if (value === "undefined") value = "ka";
  return value;
};

export const getAdditionalFieldNumberOrEmpty =
  (additionalFieldName: string) => async (csvLine: Array<string>) => {
    const additionalFields = await JSON.parse(csvLine[25]);
    let value = strip(additionalFields[additionalFieldName]);
    if (value === undefined || !value) value = "0";
    return value;
  };

export const getPhotoURL = async (csvLine: Array<string>) => {
  const images = await JSON.parse(csvLine[26]);
  return (images.image_intro as string).replace("images/", "watermarked/");
};

export const getPlanURL = async (csvLine: Array<string>) => {
  const additionalFields = await JSON.parse(csvLine[25]);
  return "watermarked/wc-plan/" + additionalFields.wc_plan + ".jpg";
};

export const getPosition = (csvLine: Array<string>) => {
  return [Number(csvLine[9]), Number(csvLine[10])];
};

export const getAddress = (csvLine: Array<string>) => {
  return csvLine[15] + " " + csvLine[16];
};
