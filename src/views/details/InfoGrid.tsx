import { Charger } from "@/types/data";
import { Grid2 as Grid, Typography } from "@mui/material";
import { Fragment } from "react";

type InfoGridProps = {
  charger: Charger;
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

export default function InfoGrid({ charger }: InfoGridProps) {
  return (
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
  );
}
