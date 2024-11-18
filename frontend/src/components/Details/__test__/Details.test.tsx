import "@testing-library/jest-dom";
import { fireEvent } from "@testing-library/react";
import { render } from "util/test/renderWithContext";
import Details from "components/Details";
import { googleMapsDirectionsURL } from "constants/api";
import i18n from "../../../../__mocks__/mockLanguage";
import { placesMock } from "../../../../__mocks__/placesMock";
import { currentLocation } from "../../../../__mocks__/currentLocation";

describe("Place details component", () => {
	const selectedPlace = placesMock.find((place) => place.id === 1);
	Element.prototype.scrollTo = () => {
		// mock
	};
	const openSpy = jest.spyOn(window, "open");

	test("renders for a selected place with title and description", () => {
		const container = render(<Details />, { selectedPlace });
		const placeTitle = selectedPlace?.title;
		const placeDescription = selectedPlace?.short_description;
		const placeTitleElement = container.queryByText(placeTitle as string);

		const placeDescriptionElement = container.queryByText(
			placeDescription as string
		);
		expect(placeTitleElement).toBeInTheDocument();
		expect(placeDescriptionElement).toBeInTheDocument();
	});

	test("clicking on route button navigates to google map directions page", () => {
		const container = render(<Details />, {
			selectedPlace,
			currentLocation,
		});
		const translatedText = i18n.t("Go") as string;
		const routeButton = container.getByText(translatedText);

		expect(routeButton).toBeInTheDocument();

		fireEvent.click(routeButton);

		expect(openSpy).toHaveBeenCalledTimes(1);
		expect(openSpy).toHaveBeenCalledWith(
			googleMapsDirectionsURL + selectedPlace?.position,
			"_blank"
		);
	});
});
