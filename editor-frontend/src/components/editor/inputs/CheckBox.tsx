import React, { ChangeEventHandler } from "react";
import { InputComponent } from "../../../types";

const CheckBox: InputComponent = ({ value, setValue, onBlur }) => {
  const boolValue: boolean = Number(value) === 1;

  const updateValue: ChangeEventHandler<HTMLInputElement> = () => {
    const newValue = Number(!boolValue);
    setValue(newValue);
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={boolValue}
        onChange={updateValue}
        onBlur={onBlur}
      />
    </div>
  );
};

export default CheckBox;
