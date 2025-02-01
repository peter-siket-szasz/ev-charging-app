import { http, HttpResponse } from "msw";
import data from "../data/Chargers";

export const handlers = [
  http.get("/api/stations", ({ request }) => {
    const url = new URL(request.url);

    const sort = url.searchParams.get("sort");

    switch (sort) {
      case "rating_asc":
        data.sort((a, b) => a.rating - b.rating);
        break;
      case "rating_desc":
        data.sort((a, b) => b.rating - a.rating);
        break;
      case "price_asc":
        data.sort(
          (a, b) =>
            +a.price_per_kWh.split(" ")[0] - +b.price_per_kWh.split(" ")[0],
        );
        break;
      case "price_desc":
        data.sort(
          (a, b) =>
            +b.price_per_kWh.split(" ")[0] - +a.price_per_kWh.split(" ")[0],
        );
        break;
      case "power_asc":
        data.sort((a, b) => +a.power.split(" ")[0] - +b.power.split(" ")[0]);
        break;
      case "power_desc":
        data.sort((a, b) => +b.power.split(" ")[0] - +a.power.split(" ")[0]);
    }

    return HttpResponse.json(data);
  }),

  http.get("/api/stations/:id", ({ params }) => {
    const { id } = params;
    const station = data.find((station) => `${station.id}` === id);

    return HttpResponse.json(station);
  }),
];
