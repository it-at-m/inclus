import React, { ChangeEvent, ChangeEventHandler } from "react";
import { InputComponent } from "../../../types";

const TextBox: InputComponent = ({ value, setValue, onBlur }) => {
  const updateValue: ChangeEventHandler<HTMLTextAreaElement> = (
    ev: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValue(ev.target.value);
  };

  return (
    <div>
      <textarea
        rows={4}
        cols={49}
        value={value}
        onChange={updateValue}
        onBlur={onBlur}
      ></textarea>
    </div>
  );
};

export default TextBox;
