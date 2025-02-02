import { useDisclosure } from "@/hooks/useDisclosure";
import { FilterAlt } from "@mui/icons-material";
import { Button } from "@mui/material";
import FilteringModal from "./FilteringModal";

export default function Filtering() {
  const { isOpen, open, close } = useDisclosure();

  return (
    <>
      <Button onClick={open} variant="outlined">
        <FilterAlt />
      </Button>
      <FilteringModal isOpen={isOpen} close={close} />
    </>
  );
}
