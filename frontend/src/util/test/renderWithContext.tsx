import { render, RenderOptions } from "@testing-library/react";
import { PlacesDispatchContext, PlacesStateContext } from "../../PlacesContext";
import { initialState } from "../../state/placesReducer";
import { Dispatch, ReactElement } from "react";
import i18n from "../../../__mocks__/mockLanguage";
import { I18nextProvider } from "react-i18next";
import { PlacesState } from "../../state/types";
import { BrowserRouter } from "react-router-dom";

const renderWithContextValues = (children, contextValues) => {
	const dispatch = jest.fn() as Dispatch<any>;
	return (
		<BrowserRouter>
			<I18nextProvider i18n={i18n}>
				<PlacesStateContext.Provider
					value={{ ...initialState, ...contextValues }}
				>
					<PlacesDispatchContext.Provider value={dispatch}>
						{children}
					</PlacesDispatchContext.Provider>
				</PlacesStateContext.Provider>
			</I18nextProvider>
		</BrowserRouter>
	);
};

const customRender = (
	ui: ReactElement,
	contextValues: Partial<PlacesState> = {},
	options?: Omit<RenderOptions, "wrapper">
) =>
	render(ui, {
		wrapper: () => renderWithContextValues(ui, contextValues),
		...options,
	});

export * from "@testing-library/react";
export { customRender as render };
