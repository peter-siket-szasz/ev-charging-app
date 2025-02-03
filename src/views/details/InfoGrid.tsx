import { Charger } from "@/types/data";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
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
  { label: "Price", key: "price_per_kWh", suffix: " PLN/kWh" },
  { label: "Rating", key: "rating" },
];

export default function InfoGrid({ charger }: InfoGridProps) {
  return (
    <Box maxWidth={{ xs: 300, md: "none" }}>
      <Typography variant="h4" component="h1" width="fit-content" mb={2}>
        Details
      </Typography>
      <Card>
        <CardHeader title={charger.name} subheader={charger.location} />
        <CardContent>
          <Grid container columns={{ xs: 1, md: 2 }} rowGap={2}>
            {fields.map((field) => (
              <Fragment key={field.label}>
                <Grid size={1}>
                  <Typography variant="body1" fontWeight="bold">
                    {field.label}
                  </Typography>
                </Grid>
                <Grid size={1}>
                  <Typography variant="body1">
                    {field.isArray
                      ? (charger[field.key] as string[]).join(", ")
                      : charger[field.key]}
                    {field.suffix}
                  </Typography>
                </Grid>
              </Fragment>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
