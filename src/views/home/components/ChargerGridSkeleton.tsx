import { Box, Skeleton } from "@mui/material";

export default function ChargerGridSkeleton() {
  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" gap={1}>
      {[...Array(6)].map((_, index) => (
        <Skeleton key={index} variant="rectangular" width={275} height={185} />
      ))}
    </Box>
  );
}
