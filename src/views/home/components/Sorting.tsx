"use client";
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
  value: string;
  label: string;
  icon?: JSX.Element | string;
  isAscending?: boolean;
};

const ratingOptions: RatingOption[] = [
  { value: "rating_desc", label: "Rating", icon: <Star /> },
  { value: "rating_asc", label: "Rating", icon: <Star />, isAscending: true },
  { value: "price_desc", label: "Price", icon: <Euro /> },
  { value: "price_asc", label: "Price", icon: <Euro />, isAscending: true },
  { value: "power_desc", label: "Power", icon: <ElectricCarSharp /> },
  {
    value: "power_asc",
    label: "Power",
    icon: <ElectricCarSharp />,
    isAscending: true,
  },
];

export default function Sorting() {
  const [sort, setSort] = useQueryState("sort", { defaultValue: "" });

  return (
    <Box display="flex" gap={2} alignItems="center">
      <Button
        variant="text"
        sx={{ p: 0.5, minWidth: 0, display: sort ? "block" : "none" }}
        onClick={() => setSort("")}
      >
        <ClearIcon sx={{ color: sort ? "red" : "gray" }} />
      </Button>
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
                  <ArrowDownward sx={{ ml: "auto" }} />
                ) : (
                  <ArrowUpward sx={{ ml: "auto" }} />
                )}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
