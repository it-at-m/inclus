import TextBox from "./inputs/TextBox";
import PositionInput from "./inputs/PositionInput";
import CheckBox from "./inputs/CheckBox";
import GripSelect from "./inputs/GripSelect";
import React from "react";
import { EditableField } from "../../types";
import PreviewImage from "./inputs/PreviewImage";

export const editableFields: EditableField[] = [
  {
    fieldName: "id",
    renderControl: (value: any) => <p>{value}</p>,
  },
  {
    fieldName: "title",
  },
  {
    fieldName: "short_description",
    renderControl: (
      value: any,
      setValue: any,
      saveUpdatedPlace: () => void
    ) => (
      <TextBox value={value} setValue={setValue} onBlur={saveUpdatedPlace} />
    ),
  },
  {
    fieldName: "position",
    renderControl: (
      value: any,
      setValue: any,
      saveUpdatedPlace: () => void
    ) => (
      <PositionInput
        value={value}
        setValue={setValue}
        onBlur={saveUpdatedPlace}
      />
    ),
  },
  {
    fieldName: "address",
    renderControl: (
      value: any,
      setValue: any,
      saveUpdatedPlace: () => void
    ) => (
      <TextBox value={value} setValue={setValue} onBlur={saveUpdatedPlace} />
    ),
  },
  {
    fieldName: "eurokey",
    renderControl: (
      value: any,
      setValue: any,
      saveUpdatedPlace: () => void
    ) => (
      <CheckBox value={value} setValue={setValue} onBlur={saveUpdatedPlace} />
    ),
  },
  {
    fieldName: "ramp_steepness",
  },
  {
    fieldName: "ramp_length",
  },
  {
    fieldName: "door_width",
  },
  {
    fieldName: "zip_code",
  },
  {
    fieldName: "city",
  },
  {
    fieldName: "grip",
    renderControl: (value: any, setValue: any, saveUpdatedPlace) => (
      <GripSelect value={value} setValue={setValue} onBlur={saveUpdatedPlace} />
    ),
  },

  {
    fieldName: "direction",
    renderControl: (
      value: any,
      setValue: any,
      saveUpdatedPlace: () => void
    ) => (
      <TextBox value={value} setValue={setValue} onBlur={saveUpdatedPlace} />
    ),
  },
  {
    fieldName: "access",
    renderControl: (
      value: any,
      setValue: any,
      saveUpdatedPlace: () => void
    ) => (
      <TextBox value={value} setValue={setValue} onBlur={saveUpdatedPlace} />
    ),
  },
  {
    fieldName: "interior_description",
    renderControl: (
      value: any,
      setValue: any,
      saveUpdatedPlace: () => void
    ) => (
      <TextBox value={value} setValue={setValue} onBlur={saveUpdatedPlace} />
    ),
  },
  {
    fieldName: "wc_details",
    renderControl: (
      value: any,
      setValue: any,
      saveUpdatedPlace: () => void
    ) => (
      <TextBox value={value} setValue={setValue} onBlur={saveUpdatedPlace} />
    ),
  },
  {
    fieldName: "wc_accessright",
  },
  {
    fieldName: "wc_accessleft",
  },
  {
    fieldName: "photo",
    renderControl: (value: any) => <PreviewImage value={value} />,
  },
  {
    fieldName: "plan",
    renderControl: (value: any) => <PreviewImage value={value} />,
  },
];
