"use client";
import { useCharger } from "@/hooks/useChargers";
import { Charger } from "@/types/data";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Grid2 as Grid } from "@mui/material";
import { Fragment } from "react";

type DetailsProps = {
  id: number;
};
type FieldDefinition = {
  label: string;
  key: keyof Charger;
  suffix?: string;
  isArray?: boolean;
};

const fields: FieldDefinition[] = [
  { label: "Location", key: "location" },
  { label: "Connectors", key: "connectors", isArray: true },
  { label: "Power", key: "power", suffix: "kW" },
  { label: "Price", key: "price_per_kWh", suffix: "PLN/kWh" },
  { label: "Rating", key: "rating" },
];

export default function Details({ id }: DetailsProps) {
  const { data: charger, isLoading, error } = useCharger(id);
  return (
    <Box>
      {isLoading && <CircularProgress />}
      {error && <div>Error: {error.message}</div>}
      {charger && (
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h3" component="h1">
            {charger.name}
          </Typography>
          <Grid
            container
            spacing={{ xs: 1, md: 3 }}
            columns={{ xs: 1, md: 2 }}
            width={1 / 2}
          >
            {fields.map((field) => (
              <Fragment key={field.key}>
                <Grid size={1}>
                  <Typography variant="h4" component="h1" width="fit-content">
                    {field.label}:
                  </Typography>
                </Grid>
                <Grid size={1} mb={{ xs: 2, md: 0 }}>
                  <Typography variant="h4" component="h1" width="fit-content">
                    {field.isArray
                      ? (charger[field.key] as string[]).join(", ")
                      : charger[field.key]}{" "}
                    {field.suffix}
                  </Typography>
                </Grid>
              </Fragment>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
