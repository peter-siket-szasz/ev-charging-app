import { Charger } from "@/types/data";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";

export function useChargers(searchParams: URLSearchParams) {
  // Delete empty params as empty strings are default values for undefined query params
  const keysToDelete: string[] = [];
  for (const [key, value] of searchParams.entries()) {
    if (value === "") {
      keysToDelete.push(key);
    }
  }
  keysToDelete.forEach((key) => {
    searchParams.delete(key);
  });

  const { data, error, isLoading } = useSWR<Charger[]>(
    `/api/stations?${searchParams.toString()}`,
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
