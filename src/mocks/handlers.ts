import { http, HttpResponse } from "msw";
import data from "../data/Chargers";

export const handlers = [
  http.get("/api/stations", () => {
    return HttpResponse.json(data);
  }),

  http.get("/api/stations/:id", ({ params }) => {
    const { id } = params;
    const station = data.find((station) => `${station.id}` === id);

    return HttpResponse.json(station);
  })
];