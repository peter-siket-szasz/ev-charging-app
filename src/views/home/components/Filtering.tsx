"use client";
import { useDisclosure } from "@/hooks/useDisclosure";
import { FilterAlt } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import FilteringModal from "./FilteringModal";

export default function Filtering() {
  const { isOpen, open, close } = useDisclosure();

  return (
    <Box display="flex" alignItems="center">
      <Button onClick={open} variant="outlined" sx={{ py: "14px" }}>
        <FilterAlt />
      </Button>
      <FilteringModal isOpen={isOpen} close={close} />
    </Box>
  );
}
