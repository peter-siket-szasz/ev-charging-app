import { http, HttpResponse } from "msw";
import data from "../data/Chargers";
import { parseCharger } from "@/data/parseCharger";
import { filterChargers, sortChargers } from "./utils";
import { QUERY_PARAMS, SORT } from "@/types/enums";

const chargers = data.map(parseCharger);

export const handlers = [
  http.get("/api/stations", async ({ request }) => {
    const url = new URL(request.url);

    const sort = url.searchParams.get(QUERY_PARAMS.SORT) as SORT;
    const res = sortChargers(chargers, sort);

    const filtered = filterChargers(res, url.searchParams);

    return HttpResponse.json(filtered);
  }),

  http.get("/api/stations/:id", ({ params }) => {
    const { id } = params;
    const station = chargers.find((station) => `${station.id}` === id);

    return HttpResponse.json(station);
  }),
];
