import { Charger } from "@/types/data";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";

export function useChargers(query: Record<string, string>) {
  const queryParams = new URLSearchParams(query);

  // Delete empty params as empty strings are default values for undefined query params
  const keysToDelete: string[] = [];
  for (const [key, value] of queryParams.entries()) {
    if (value === "") {
      keysToDelete.push(key);
    }
  }
  keysToDelete.forEach((key) => {
    queryParams.delete(key);
  });

  const { data, error, isLoading } = useSWR<Charger[]>(
    `/api/stations?${queryParams.toString()}`,
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
