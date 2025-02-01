"use client";
import { useCharger, useChargers } from "./hooks/charger";

export default function Home() {

  const { data, error, isLoading } = useChargers();
  const { data: charger5 } = useCharger(5);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div>Test header</div>
      <div>chargers: {data?.map(c => c.name)}{" "}</div>
      <div>Charger 5: {charger5?.name}</div>
    </>
  );
}
