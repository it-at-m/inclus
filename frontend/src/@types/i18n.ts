import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "../locales/EN/en.json";
import translationDE from "../locales/DE/de.json";

// the @types
const resources = {
	en: {
		translation: translationEN,
	},
	de: {
		translation: translationDE,
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng: "de",
	keySeparator: false,
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
