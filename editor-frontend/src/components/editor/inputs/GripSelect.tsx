import React, { ChangeEvent, ChangeEventHandler } from "react";
import { GripValue, InputComponent } from "../../../types";

const gripValues: GripValue[] = [
  { value: "lr", description: "Flexible Left & Flexible Right" },
  { value: "l", description: "Flexible Left" },
  { value: "rfl", description: "Fixed Left & Flexible Right" },
  { value: "flr", description: "Fixed Left & Flexible Right" },
  { value: "fr", description: "Fixed Right" },
  { value: "none", description: "No Grip" },
  { value: "lfr", description: "Flexible Left & Fixed Right" },
  { value: "r", description: "Flexible Right" },
  { value: "fl", description: "Fixed Left" },
];

const GripSelect: InputComponent = ({ value, setValue, onBlur }) => {
  const updateGrip: ChangeEventHandler<HTMLSelectElement> = (
    ev: ChangeEvent<HTMLSelectElement>
  ) => {
    setValue(ev.target.value);
  };
  return (
    <select onChange={updateGrip} value={value} onBlur={onBlur}>
      {gripValues.map((gripValue) => {
        return (
          <option key={gripValue.value} value={gripValue.value}>
            {gripValue.description}
          </option>
        );
      })}
    </select>
  );
};

export default GripSelect;
