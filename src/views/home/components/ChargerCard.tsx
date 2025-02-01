import { Charger } from "@/types/data";
import { ArrowRight } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, Rating, Typography } from "@mui/material";

type ChargerCardProps = {
  charger: Charger;
};

export default function ChargerCard({ charger }: ChargerCardProps) {
  return (
    <Card sx={{ minWidth: 275, width: { xs: "100%", sm: "49%", md: "32%", lg: "24%" } }}>
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

        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <Rating defaultValue={charger.rating} precision={0.1} />
          <Typography variant="body2" sx={{ color: "text.secondary" }}>{charger.rating.toPrecision(2)}</Typography>
        </Box>

      </CardContent>
      <CardActions>
        <Button size="small">Details <ArrowRight /></Button>
      </CardActions>
    </Card>
  );
}