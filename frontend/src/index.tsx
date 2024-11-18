import { BrowserRouter } from "react-router-dom";
import React, { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOMClient.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>
);
