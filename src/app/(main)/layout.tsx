"use client";
import ResponsiveAppBar from "@/components/ReponsiveAppBar";
import { ChildrenType } from "@/types/core";
import { Box } from "@mui/material";

export default function Layout({ children }: ChildrenType) {
  return (
    <Box>
      <ResponsiveAppBar />
      <Box paddingTop={2} paddingX={2}>
        {children}
      </Box>
    </Box>
  );
}
