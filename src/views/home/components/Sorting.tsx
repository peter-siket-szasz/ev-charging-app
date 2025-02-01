"use client";
import {
  ArrowDownward,
  ArrowUpward,
  ElectricCarSharp,
  Euro,
  Star,
} from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useQueryState } from "nuqs";
import { JSX } from "react";

type RatingOption = {
  value: string;
  label: string;
  icon?: JSX.Element | string;
  isAscending?: boolean;
};

const ratingOptions: RatingOption[] = [
  { value: "rating_asc", label: "Rating", icon: <Star />, isAscending: true },
  { value: "rating_desc", label: "Rating", icon: <Star /> },
  { value: "price_asc", label: "Price", icon: <Euro />, isAscending: true },
  { value: "price_desc", label: "Price", icon: <Euro /> },
  {
    value: "power_asc",
    label: "Power",
    icon: <ElectricCarSharp />,
    isAscending: true,
  },
  { value: "power_desc", label: "Power", icon: <ElectricCarSharp /> },
];

export default function Sorting() {
  const [sort, setSort] = useQueryState("sort");

  return (
    <Box display="flex" gap={2} alignItems="center">
      <ClearIcon sx={{ color: "red" }} />
      <FormControl fullWidth>
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
