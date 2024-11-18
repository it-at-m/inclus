import { render } from "../../../../util/test/renderWithContext";
import "@testing-library/jest-dom";
import LocateMeButtonMessage from "../LocateMeButtonMessage";
import i18n from "../../../../../__mocks__/mockLanguage";
import { fireEvent } from "@testing-library/react";

describe("locate me button message", () => {
	test("renders onboarding message if there is no entry in local storage", () => {
		const container = render(<LocateMeButtonMessage />);
		const translatedText = i18n.t("locateMeOnboardingMessage") as string;
		expect(container.queryByText(translatedText)).toBeInTheDocument();
	});

	test("clicking the close button closes the message and updates local storage", async () => {
		const container = render(<LocateMeButtonMessage />);
		const translatedText = i18n.t("locateMeOnboardingMessage") as string;
		expect(container.queryByText(translatedText)).toBeInTheDocument();
		const closeButton = container.getByRole("button");
		fireEvent.click(closeButton);
		expect(container.queryByText(translatedText)).not.toBeInTheDocument();
		expect(global.localStorage.getItem("onBoardedLocateMe")).toBe("true");
	});

	test("renders nothing if there is an entry in local storage", () => {
		global.localStorage.setItem("onBoardedLocateMe", "true");
		const container = render(<LocateMeButtonMessage />);
		const translatedText = i18n.t("locateMeOnboardingMessage") as string;
		expect(container.queryByText(translatedText)).not.toBeInTheDocument();
	});
});
