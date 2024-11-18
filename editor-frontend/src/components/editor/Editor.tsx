import React, { useState } from "react";
import { editableFields } from "./EditableFields";
import { EditorComponent, FieldValue, Place } from "../../types";
import TextInput from "./inputs/TextInput";

const Editor: EditorComponent = ({ place, setField, saveUpdatedPlace }) => {
  return (
    <table>
      <tbody>
        {editableFields.map(({ fieldName, renderControl }) => {
          let renderedControl: JSX.Element;

          const initialValue: FieldValue = place[fieldName as keyof Place];

          if (renderControl) {
            renderedControl = renderControl(
              initialValue,
              (fieldValue: FieldValue) => setField(fieldName, fieldValue),
              saveUpdatedPlace
            );
          } else {
            renderedControl = (
              <TextInput
                value={initialValue as string}
                setValue={(fieldValue: FieldValue) =>
                  setField(fieldName, fieldValue)
                }
                onBlur={saveUpdatedPlace}
              />
            );
          }
          return (
            <tr key={place.id + "_" + fieldName}>
              <td>{fieldName}:</td>
              <td>{renderedControl}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Editor;
