import { Box } from "@mui/material";
import React from "react";
import DashboardTabs from "./DashboardTabs";
import DashboardPanel from "./DashboardPanel";

const TabsWrapper = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <DashboardTabs />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DashboardPanel />
      </Box>
    </Box>
  );
};

export default TabsWrapper;
