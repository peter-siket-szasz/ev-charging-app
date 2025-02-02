import { Charger } from "@/types/data";
import { QUERY_PARAMS, SORT } from "@/types/enums";

export function sortChargers(chargers: Charger[], sort: SORT) {
  return chargers.sort((a, b) => {
    switch (sort) {
      case SORT.SORT_RATING_DESC:
        return b.rating - a.rating;
      case SORT.SORT_RATING_ASC:
        return a.rating - b.rating;
      case SORT.SORT_PRICE_DESC:
        return b.price_per_kWh - a.price_per_kWh;
      case SORT.SORT_PRICE_ASC:
        return a.price_per_kWh - b.price_per_kWh;
      case SORT.SORT_POWER_DESC:
        return b.power - a.power;
      case SORT.SORT_POWER_ASC:
        return a.power - b.power;
      default:
        return 0;
    }
  });
}

export function filterChargers(chargers: Charger[], query: URLSearchParams) {
  const powerStart = query.get(QUERY_PARAMS.POWER_START);
  const powerEnd = query.get(QUERY_PARAMS.POWER_END);
  const priceStart = query.get(QUERY_PARAMS.PRICE_START);
  const priceEnd = query.get(QUERY_PARAMS.PRICE_END);

  return chargers.filter(
    (charger) =>
      !(powerStart && charger.power < Number(powerStart)) &&
      !(powerEnd && charger.power > Number(powerEnd)) &&
      !(priceStart && charger.price_per_kWh < Number(priceStart)) &&
      !(priceEnd && charger.price_per_kWh > Number(priceEnd)),
  );
}
