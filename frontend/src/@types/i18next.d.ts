import "i18next";
import de from "locales/DE/de.json";
import en from "locales/EN/en.json";

declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: "de";
		resources: {
			de: typeof de;
			en: typeof en;
		};
	}
}
