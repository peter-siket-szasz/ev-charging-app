import {
  MAX_POWER,
  MAX_PRICE,
  MIN_POWER,
  MIN_PRICE,
  SLIDER_THROTTLE_MS,
} from "@/types/consts";
import { QUERY_PARAMS } from "@/types/enums";
import {
  Box,
  Button,
  FormControl,
  Modal,
  Slider,
  Typography,
} from "@mui/material";
import { parseAsFloat, parseAsInteger, useQueryState } from "nuqs";
import { useCallback } from "react";

type FilteringModalProps = {
  isOpen: boolean;
  close: () => void;
};

export default function FilteringModal({ isOpen, close }: FilteringModalProps) {
  const [powerStart, setPowerStart] = useQueryState<number>(
    QUERY_PARAMS.POWER_START,
    parseAsInteger
      .withDefault(MIN_POWER)
      .withOptions({ shallow: false, throttleMs: SLIDER_THROTTLE_MS }),
  );
  const [powerEnd, setPowerEnd] = useQueryState<number>(
    QUERY_PARAMS.POWER_END,
    parseAsInteger
      .withDefault(MAX_POWER)
      .withOptions({ shallow: false, throttleMs: SLIDER_THROTTLE_MS }),
  );
  const [priceStart, setPriceStart] = useQueryState<number>(
    QUERY_PARAMS.PRICE_START,
    parseAsFloat
      .withDefault(MIN_PRICE)
      .withOptions({ shallow: false, throttleMs: SLIDER_THROTTLE_MS }),
  );
  const [priceEnd, setPriceEnd] = useQueryState<number>(
    QUERY_PARAMS.PRICE_END,
    parseAsFloat
      .withDefault(MAX_PRICE)
      .withOptions({ shallow: false, throttleMs: SLIDER_THROTTLE_MS }),
  );
  const handleChange = useCallback(
    (newValue: number, setter: (value: number) => void) => {
      setter(newValue);
    },
    [],
  );

  return (
    <Modal open={isOpen} onClose={close} aria-labelledby="modal-modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          pb: 2,
          minWidth: { xs: 250, md: 400, lg: 500 },
        }}
      >
        <Typography id="modal-modal-title" variant="h5" component="h2" mb={2}>
          Filter charging stations
        </Typography>
        <FormControl fullWidth>
          <Box sx={{ px: 2 }}>
            <Typography id="power-slider" variant="h6">
              Power output
            </Typography>
            <Slider
              getAriaLabel={() => "Power range"}
              value={[powerStart, powerEnd]}
              onChange={(_, newValue, activeThumb) =>
                handleChange(
                  (newValue as number[])[activeThumb],
                  activeThumb === 0 ? setPowerStart : setPowerEnd,
                )
              }
              disableSwap
              valueLabelDisplay="auto"
              marks={[
                { value: MIN_POWER, label: `${MIN_POWER} kW` },
                { value: MAX_POWER, label: `${MAX_POWER} kW` },
              ]}
              max={MAX_POWER}
            />
          </Box>
          <Box sx={{ px: 2 }}>
            <Typography id="price-slider" variant="h6">
              Price
            </Typography>
            <Slider
              getAriaLabel={() => "Price range"}
              value={[priceStart, priceEnd]}
              onChange={(_, newValue, activeThumb) =>
                handleChange(
                  (newValue as number[])[activeThumb],
                  activeThumb === 0 ? setPriceStart : setPriceEnd,
                )
              }
              disableSwap
              valueLabelDisplay="auto"
              step={0.01}
              marks={[
                { value: MIN_PRICE, label: `${MIN_PRICE} PLN/kWh` },
                { value: MAX_PRICE, label: `${MAX_PRICE} PLN/kWh` },
              ]}
              max={MAX_PRICE}
            />
          </Box>
        </FormControl>
        <Box mt={2} display="flex">
          <Button onClick={close} sx={{ ml: "auto" }}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
