export type Charger = {
  id: number;
  name: string;
  location: string;
  power: string;
  price_per_kWh: string;
  rating: number;
  available_slots: number;
  connectors: string[];
  fast_charging: boolean;
  open_hours: string;
  suppoerted_vehicles: string[];
};