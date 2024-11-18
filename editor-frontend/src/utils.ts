import { Place } from "./types";

export const filterPlaces = (filterString: string, places: Place[]) => {
  return places.filter(
    (place: Place) =>
      place.title.toLowerCase().indexOf(filterString.toLowerCase()) !== -1 ||
      place.short_description
        .toLowerCase()
        .indexOf(filterString.toLowerCase()) !== -1 ||
      place.id + "" === filterString.toLowerCase()
  );
};
