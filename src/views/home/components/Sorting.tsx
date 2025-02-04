"use client";
import { SORT } from "@/types/enums";
import {
  ArrowDownward,
  ArrowUpward,
  ElectricCarSharp,
  Euro,
  Star,
} from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useQueryState } from "nuqs";
import { JSX } from "react";

type RatingOption = {
  value: SORT;
  label: string;
  icon?: JSX.Element | string;
  isAscending?: boolean;
};

const ratingOptions: RatingOption[] = [
  {
    value: SORT.SORT_RATING_ASC,
    label: "Rating",
    icon: <Star />,
    isAscending: true,
  },
  { value: SORT.SORT_RATING_DESC, label: "Rating", icon: <Star /> },
  {
    value: SORT.SORT_PRICE_ASC,
    label: "Price",
    icon: <Euro />,
    isAscending: true,
  },
  { value: SORT.SORT_PRICE_DESC, label: "Price", icon: <Euro /> },
  {
    value: SORT.SORT_POWER_ASC,
    label: "Power",
    icon: <ElectricCarSharp />,
    isAscending: true,
  },
  { value: SORT.SORT_POWER_DESC, label: "Power", icon: <ElectricCarSharp /> },
];

export default function Sorting() {
  const [sort, setSort] = useQueryState("sort", {
    defaultValue: "",
  });

  return (
    <Box display="flex" gap={2} alignItems="center">
      {sort && (
        <Button
          variant="text"
          sx={{ p: 0.5, minWidth: 0 }}
          onClick={() => setSort("")}
        >
          <ClearIcon color="error" />
        </Button>
      )}
      <FormControl fullWidth sx={{ minWidth: 100 }}>
        <InputLabel id="sort">Sort by</InputLabel>
        <Select
          labelId="sort"
          id="sort"
          value={sort}
          label="Sort by"
          onChange={(e) => setSort(e.target.value)}
        >
          {ratingOptions.map((option) => (
            <MenuItem value={option.value} key={`${option.value}_asc`}>
              <Box display="flex" alignItems="center" gap={1} width="100%">
                {option.icon}
                {option.label}
                {option.isAscending ? (
                  <ArrowUpward sx={{ ml: "auto" }} />
                ) : (
                  <ArrowDownward sx={{ ml: "auto" }} />
                )}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
