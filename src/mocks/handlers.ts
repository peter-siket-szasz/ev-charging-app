import { delay, http, HttpResponse } from "msw";
import data from "../data/Chargers";
import { parseCharger } from "@/data/parseCharger";
import { filterChargers, sortChargers } from "./utils";
import { QUERY_PARAMS, SORT } from "@/types/enums";

// Initialise data for responses
const chargers = data.map(parseCharger);

export const handlers = [
  http.get("/api/stations", async ({ request }) => {
    const url = new URL(request.url);

    // Sort and filter data
    const sort = url.searchParams.get(QUERY_PARAMS.SORT) as SORT;
    const res = sortChargers(chargers, sort);

    const filtered = filterChargers(res, url.searchParams);

    // Simulate network delay
    await delay();
    // Return resulting data
    return HttpResponse.json(filtered);
  }),

  http.get("/api/stations/:id", async ({ params }) => {
    const { id } = params;

    // Find station by id
    const station = chargers.find((station) => `${station.id}` === id);

    await delay();
    return HttpResponse.json(station);
  }),

  http.post("/api/create-booking", async ({ request }) => {
    // Dummy API so just pass request body back as response
    const booking = await request.json();

    // Normally data would be validated and saved to a database

    await delay();
    return HttpResponse.json(booking, { status: 201 });
  }),
];
