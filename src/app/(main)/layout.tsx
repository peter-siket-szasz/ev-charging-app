"use client";
import ResponsiveAppBar from "@/components/ReponsiveAppBar";
import { ChildrenType } from "@/types/core";
import { Box } from "@mui/material";

export default function Layout({ children }: ChildrenType) {
  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <ResponsiveAppBar />
      <Box margin={2} flexGrow={1}>
        {children}
      </Box>
    </Box>
  );
}
