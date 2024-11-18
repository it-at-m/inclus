import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "../src/locales/EN/en.json";
import translationDE from "../src/locales/DE/de.json";

i18n.use(initReactI18next).init({
	lng: "de",
	fallbackLng: "de",

	debug: true,

	resources: {
		en: {
			translation: translationEN,
		},
		de: {
			translation: translationDE,
		},
	},
});

export default i18n;
