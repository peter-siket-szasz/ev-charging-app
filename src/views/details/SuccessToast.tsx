import { CheckCircleRounded } from "@mui/icons-material";
import { Box, Snackbar, SnackbarContent } from "@mui/material";

type SuccessToastProps = {
  isOpen: boolean;
  close: () => void;
};

export default function SuccessToast({ isOpen, close }: SuccessToastProps) {
  return (
    <Snackbar
      open={isOpen}
      onClose={close}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <SnackbarContent
        sx={{ backgroundColor: "success.light" }}
        message={
          <Box display="flex" gap={1} alignItems="center">
            <CheckCircleRounded />
            Booking successful!
          </Box>
        }
      />
    </Snackbar>
  );
}
