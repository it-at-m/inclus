import { Place } from "../types";

export enum ImportErrorLevel {
  ERROR = "ERROR",
  WARNING = "WARNING",
}

export type ValidationResult = {
  isValid: boolean;
  message?: string;
};

export type Validator = (value: any) => ValidationResult;

export type ValidatorByIndex = (index: number) => Validator;

export type ValidatorByFieldName = (fieldName: string) => Validator;

export type FieldConfig = {
  fieldName: keyof Place;
  getter: any;
  validator?: ValidatorByIndex | ValidatorByFieldName | Validator;
  errorLevel: ImportErrorLevel;
};
