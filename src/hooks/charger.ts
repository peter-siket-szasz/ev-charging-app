import { Charger } from "@/types/data";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";

export function useChargers() {
  const { data, error, isLoading } = useSWR<Charger[]>(
    "/api/stations",
    fetcher,
  );

  return {
    data,
    error,
    isLoading,
  };
}

export function useCharger(id: number) {
  const { data, error, isLoading } = useSWR<Charger>(
    `/api/stations/${id}`,
    fetcher,
  );

  return {
    data,
    error,
    isLoading,
  };
}
