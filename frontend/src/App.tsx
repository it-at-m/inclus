import React, { useEffect, useReducer } from "react";
import Map from "./components/Map";
import Contribute from "./components/Map/Contribute";
import Imprint from "./components/Imprint";
import Privacy from "./components/Privacy";
import FormReportProblem from "./components/Forms/ReportProblem";
import FormAddInformation from "./components/Forms/AddInformation";
import FormAddToilet from "./components/Forms/AddToilet";
import FormVolunteerSignup from "./components/Forms/VolunteerSignup";
import { Routes, Route } from "react-router-dom";

import placesReducer, { initialState } from "./state/placesReducer";
import { PlacesDispatchContext, PlacesStateContext } from "./PlacesContext";
import { loadData } from "./state/DataLoader";
import { PlacesActions } from "./state/actions";
import "./App.css";

const App = () => {
	const [state, dispatch] = useReducer(placesReducer, initialState);

	useEffect(() => {
		const doLoad = async () => {
			dispatch({
				type: PlacesActions.PLACES_LIST_REQUEST,
				payload: null,
			});
			try {
				const places = await loadData();
				dispatch({
					type: PlacesActions.PLACES_LIST_SUCCESS,
					payload: {
						places,
					},
				});
			} catch (e) {
				dispatch({
					type: PlacesActions.PLACES_LIST_FAIL,
					payload: null,
				});
			}
		};

		doLoad();
	}, []);

	return (
		<PlacesStateContext.Provider value={state}>
			<PlacesDispatchContext.Provider value={dispatch}>
				<main>
					<Routes>
						<Route index element={<Map />} />
						<Route path="/wc/:id" element={<Map />} />
						<Route
							path="/wc/:id/report-problem"
							element={<FormReportProblem />}
						/>
						<Route
							path="/wc/:id/add-information"
							element={<FormAddInformation />}
						/>
						<Route path="/wc/add-new" element={<FormAddToilet />} />
						<Route
							path="/volunteer/signup"
							element={<FormVolunteerSignup />}
						/>
						<Route path="/contribute" element={<Contribute />} />
						<Route path="/imprint" element={<Imprint />} />
						<Route path="/privacy" element={<Privacy />} />
					</Routes>
				</main>
			</PlacesDispatchContext.Provider>
		</PlacesStateContext.Provider>
	);
};

export default App;
