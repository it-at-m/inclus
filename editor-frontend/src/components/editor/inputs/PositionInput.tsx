import React, { ChangeEvent, ChangeEventHandler } from "react";
import { InputComponent } from "../../../types";

const PositionInput: InputComponent = ({ value, setValue, onBlur }) => {
  const updateLat: ChangeEventHandler<HTMLInputElement> = (
    ev: ChangeEvent<HTMLInputElement>
  ) => {
    setValue([ev.target.value, value[1]]);
  };

  const updateLng: ChangeEventHandler<HTMLInputElement> = (
    ev: ChangeEvent<HTMLInputElement>
  ) => {
    setValue([value[0], ev.target.value, value[1]]);
  };

  return (
    <div className="positionInput">
      <input
        type="text"
        value={value[0]}
        onChange={updateLat}
        size={10}
        onBlur={onBlur}
      />
      <input
        type="text"
        value={value[1]}
        onChange={updateLng}
        size={10}
        onBlur={onBlur}
      />
    </div>
  );
};

export default PositionInput;
