/* eslint-disable @stylistic/indent */
import { Charger } from "@/types/data";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseCharger(data: any): Charger {
  return {
    id: data["id"],
    name: data["name"],
    location: data["location"],
    power: Number(data["power"].split(" ")[0]),
    price_per_kWh: Number(data["price_per_kWh"].split(" ")[0]),
    rating: data["rating"],
    available_slots: data["available_slots"],
    connectors: data["connectors"],
    fast_charging: data["fast_charging"],
    open_hours:
      data["open_hours"] === "24/7"
        ? [0, 24]
        : data["open_hours"]
            .split("-")
            .map((time: string) => Number(time.split(":")[0])),
    suppoerted_vehicles: data["suppoerted_vehicles"],
  };
}
