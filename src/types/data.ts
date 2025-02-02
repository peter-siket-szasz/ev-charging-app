export type Charger = {
  id: number;
  name: string;
  location: string;
  power: number;
  price_per_kWh: number;
  rating: number;
  available_slots: number;
  connectors: string[];
  fast_charging: boolean;
  open_hours: number[];
  suppoerted_vehicles: string[];
};
