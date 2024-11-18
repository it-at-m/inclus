import React from "react";
import { imgURL } from "../../../constants";
import { PreviewImageComponent } from "../../../types";

const PreviewImage: PreviewImageComponent = ({ value }) => {
  return (
    <div>
      <img src={imgURL + value} />
    </div>
  );
};

export default PreviewImage;
