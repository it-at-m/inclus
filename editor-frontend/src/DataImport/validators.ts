import { Validator, ValidatorByFieldName, ValidatorByIndex } from "./types";
import { Grip } from "../types";

export const nonEmptyStringValidator: ValidatorByIndex =
  (index: number) => (value: string) => {
    if (!value || value.length === 0) {
      return {
        isValid: false,
        message: "Value at index " + index + " cannot be empty",
      };
    } else {
      return { isValid: true };
    }
  };

export const nonEmptyAdditionalFieldValidator: ValidatorByFieldName =
  (fieldName: string) => (value: string) => {
    if (!value || value.length === 0) {
      return {
        isValid: false,
        message: "Value at additional field " + fieldName + " cannot be empty",
      };
    } else {
      return { isValid: true };
    }
  };

export const numberByIndexValidator: ValidatorByIndex =
  (index: number) => (value: number) => {
    if (!value || Number.isNaN(value)) {
      return {
        isValid: false,
        message:
          "Value at index " +
            index +
            " must not be empty and must be a number, provided " +
            value || "empty value",
      };
    } else {
      return { isValid: true };
    }
  };

export const numberAdditionalFieldValidator: ValidatorByFieldName =
  (fieldName) => (value: string) => {
    if (!value) {
      return {
        isValid: false,
        message:
          "Value at additional fields " + fieldName + " must not be empty",
      };
    }

    if (Number.isNaN(parseFloat(value))) {
      return {
        isValid: false,
        message:
          "Value at additional fields " +
          fieldName +
          " must be a number, provided " +
          value,
      };
    }

    return { isValid: true };
  };

export const positionValidator = (value: Array<any>) => {
  let message = "";
  let isValid = true;
  if (Number.isNaN(value[0])) {
    isValid = false;
    message +=
      "Value at index 9 must be a number to represent correct latitude. ";
  }
  if (Number.isNaN(value[1])) {
    isValid = false;
    message +=
      "Value at index 10 must be a number to represent correct longitude. ";
  }

  if (value[0] === 0 || value[1] === 0) {
    isValid = false;
    message = "Position values (indexes 9 and 10) must not be empty or 0";
  }
  return { isValid, message };
};

export const addressValidator = (value: string) => {
  if (!value || value.length === 0 || value === " ") {
    return {
      isValid: false,
      message:
        "Values at indexes 15 and 16 must not be empty to form a valid address",
    };
  } else {
    return { isValid: true };
  }
};

export const gripValidator = (value: string) => {
  let gripValues = "";
  for (let validGrip in Grip) {
    if (value === validGrip) {
      return { isValid: true };
    }
    gripValues += validGrip + ", ";
  }
  return {
    isValid: false,
    message:
      "Value of additional field wc_wheregrip must be one of: " +
      gripValues +
      " provided " +
      value,
  };
};

export const euroKeyValidator: Validator = (value: string) => {
  if (value && ["0", "1", "ka"].includes(value)) {
    return { isValid: true };
  }
  return {
    isValid: false,
    message:
      "Value of additional field wc_euro must be either 0, 1 or ka provided " +
        value || "empty value",
  };
};

export const imageURLValidator = (value: string) => {
  if (value && value.length > 0 && value.match(/[^/]+(jpg|png)$/)) {
    return { isValid: true };
  } else {
    return {
      isValid: false,
      message:
        "Values of image filenames must not be empty and must be valid image filenames",
    };
  }
};
