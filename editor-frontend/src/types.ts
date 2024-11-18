import { FC } from "react";

export type SetFieldFunction = (
  fieldName: string,
  fieldValue: FieldValue
) => void;

export type InputComponentProps = {
  value: string;
  setValue: (fieldValue: any) => void;
  onBlur: () => void;
};

export type InputComponent = FC<InputComponentProps>;

export type PreviewImageComponent = FC<{ value: string }>;

export type GripValue = {
  value: string;
  description: string;
};

export enum Grip {
  lr = "Flexible Left & Flexible Right",
  l = "Flexible Left",
  rfl = "Fixed Left & Flexible Right",
  flr = "Fixed Left & Flexible Right",
  fr = "Fixed Right",
  none = "No Grip",
  lfr = "Flexible Left & Fixed Right",
  r = "Flexible Right",
  fl = "Fixed Left",
}

export type Place = {
  title: string;
  short_description: string;
  photo: string;
  plan: string;
  position: [number, number];
  address: string;
  eurokey: string;
  ramp_steepness: string;
  ramp_length: string;
  door_width: number;
  modified: string;
  zip_code: number;
  city: string;
  grip: string;
  direction: string;
  access: string;
  interior_description: string;
  wc_details: string;
  wc_accessright: string;
  wc_accessleft: string;
  id: number;
  cbf_id: number;
  closest_toilets?: Array<Partial<Place>>;
};

export type EditorComponentProps = {
  place: Place;
  setField: SetFieldFunction;
  saveUpdatedPlace: () => void;
};

export type EditorComponent = FC<EditorComponentProps>;

export type FieldValue =
  | string
  | number
  | [number, number]
  | undefined
  | Partial<Place>[];

export type EditableField = {
  fieldName: string;
  renderControl?: (
    value: any,
    setValue: (fieldValue: FieldValue) => void,
    onBlur: () => void
  ) => JSX.Element;
};

export type EditorState = {
  places: Place[];
  filterString: string;
  filteredPlaces: Place[];
  editedPlace: Place | null;
  fileName: "";
};
