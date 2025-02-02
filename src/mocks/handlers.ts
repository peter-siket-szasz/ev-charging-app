import { delay, http, HttpResponse } from "msw";
import data from "../data/Chargers";
import { parseCharger } from "@/data/parseCharger";

const chargers = data.map(parseCharger);

export const handlers = [
  http.get("/api/stations", async ({ request }) => {
    const url = new URL(request.url);

    const sort = url.searchParams.get("sort");

    switch (sort) {
      case "rating_asc":
        chargers.sort((a, b) => a.rating - b.rating);
        break;
      case "rating_desc":
        chargers.sort((a, b) => b.rating - a.rating);
        break;
      case "price_asc":
        chargers.sort((a, b) => a.price_per_kWh - b.price_per_kWh);
        break;
      case "price_desc":
        chargers.sort((a, b) => b.price_per_kWh - a.price_per_kWh);
        break;
      case "power_asc":
        chargers.sort((a, b) => a.power - b.power);
        break;
      case "power_desc":
        chargers.sort((a, b) => b.power - a.power);
    }
    await delay();

    return HttpResponse.json(chargers);
  }),

  http.get("/api/stations/:id", ({ params }) => {
    const { id } = params;
    const station = chargers.find((station) => `${station.id}` === id);

    return HttpResponse.json(station);
  }),
];
