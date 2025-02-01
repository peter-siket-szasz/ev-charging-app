import { Charger } from "@/types/data";
import { ArrowRight } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";

type ChargerCardProps = {
  charger: Charger;
};

export default function ChargerCard({ charger }: ChargerCardProps) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {charger.location}
        </Typography>
        <Typography variant="h5" component="div">
          {charger.name}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>Power: {charger.power}</Typography>
        <Typography variant="body2">
          Price: {charger.price_per_kWh}/kWh
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Details <ArrowRight></ArrowRight></Button>
      </CardActions>
    </Card>
  );
}