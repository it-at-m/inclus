import { createContext } from "react";
import { EditorState } from "../types";

export const EditorStateContext = createContext<EditorState | null>(null);
export const EditorDispatchContext = createContext<any>(null);
