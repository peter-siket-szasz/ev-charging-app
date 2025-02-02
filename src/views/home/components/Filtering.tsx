import { useDisclosure } from "@/hooks/useDisclosure";
import { MAX_POWER, MIN_POWER, SLIDER_THROTTLE_MS } from "@/types/consts";
import { QUERY_PARAMS } from "@/types/enums";
import { FilterAlt } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Modal,
  Slider,
  Typography,
} from "@mui/material";
import { parseAsInteger, useQueryState } from "nuqs";

export default function Filtering() {
  const { isOpen, open, close } = useDisclosure();

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
  const handleChange = (newValue: number, setter: (value: number) => void) => {
    setter(newValue);
  };

  return (
    <>
      <Button onClick={open} variant="outlined">
        <FilterAlt />
      </Button>
      <Modal open={isOpen} onClose={close} aria-labelledby="modal-modal-title">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h5" component="h2" mb={2}>
            Filter charging stations
          </Typography>
          <FormControl fullWidth>
            <Box sx={{ width: 300 }}>
              <Typography id="power-slider" variant="h6">
                Power
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
                max={350}
              />
            </Box>
          </FormControl>
        </Box>
      </Modal>
    </>
  );
}
