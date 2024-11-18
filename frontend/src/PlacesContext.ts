import { PlacesState } from "./state/types";
import React, { createContext } from "react";

export const PlacesStateContext = createContext<PlacesState | null>(null);
export const PlacesDispatchContext = createContext<React.Dispatch<any>>(
	() => null
);
