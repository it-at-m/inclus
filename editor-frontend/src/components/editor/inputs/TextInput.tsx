import React, { ChangeEvent, ChangeEventHandler } from "react";
import { InputComponent } from "../../../types";

const TextInput: InputComponent = ({ value, setValue, onBlur }) => {
  const updateValue: ChangeEventHandler<HTMLInputElement> = (
    ev: ChangeEvent<HTMLInputElement>
  ) => {
    setValue(ev.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={updateValue}
        size={60}
        onBlur={onBlur}
      />
    </div>
  );
};

export default TextInput;
