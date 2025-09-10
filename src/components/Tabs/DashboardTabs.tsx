"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import GavelIcon from "@mui/icons-material/Gavel";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SummarizeIcon from "@mui/icons-material/Summarize";
import SettingsIcon from "@mui/icons-material/Settings";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "@/features/userSlice";
import { RootState } from "@/store/appStore";
import { toKebabCase } from "@/utils/stringFormatter";

const drawerWidth = 240;
const collapsedWidth = 72;

const DashboardTabs = () => {
  const [open, setOpen] = useState(true);
  const activeTab = useSelector((state: RootState) => state.user.activeTab);

  const dispatch = useDispatch();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "Accounts", icon: <PersonIcon /> },
    { text: "Batches", icon: <BookmarkIcon /> },
    { text: "Resolution", icon: <GavelIcon /> },
    { text: "Assessments", icon: <AssessmentIcon /> },
    { text: "Appeal Letter", icon: <AccountBalanceIcon />, active: true },
    { text: "Summary", icon: <SummarizeIcon /> },
  ];

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleTabChange = (value: string) => {
    dispatch(setActiveTab(toKebabCase(value)));
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : collapsedWidth,
          boxSizing: "border-box",
          bgcolor: "#2E4F6F",
          color: "white",
          borderRadius: "0px 20px 20px 0px",
          transition: "width 0.3s",
          overflow: "visible",
          p: 1,
          mt: 8,
          height: "calc(100vh - 100px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "fixed",
          top: 0,
          left: 0
        },
      }}
    >
      <Box>
        <Box
          sx={{
            position: "absolute",
            top: 20,
            right: -18,
            zIndex: 10,
            bgcolor: "white",
            borderRadius: "50%",
            boxShadow: 3,
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={toggleDrawer}
        >
          <ChevronLeftIcon
            sx={{
              color: "#27d6a8",
              transform: open ? "rotate(0deg)" : "rotate(180deg)",
              transition: "transform 0.3s ease",
            }}
          />
        </Box>
        <List>
          {menuItems.map((item) => (
            <Tooltip
              title={!open ? item.text : ""}
              placement="right"
              key={item.text}
            >
              <ListItem
                disablePadding
                onClick={() => handleTabChange(item.text)}
              >
                <ListItemButton
                  sx={{
                    borderRadius: "8px",
                    mb: 0.5,
                    bgcolor:
                      toKebabCase(item.text) == activeTab
                        ? "rgba(255, 255, 255, 0.2)"
                        : "transparent",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{ color: "white", minWidth: 0, mr: open ? 2 : "auto" }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {open && <ListItemText primary={item.text} />}
                </ListItemButton>
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Box>
      <Box sx={{ mb: 2 }}>
        <List>
          <Tooltip title={!open ? "Settings" : ""} placement="right">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon
                  sx={{ color: "white", minWidth: 0, mr: open ? 2 : "auto" }}
                >
                  <SettingsIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Settings" />}
              </ListItemButton>
            </ListItem>
          </Tooltip>
        </List>
        <Button
          variant="contained"
          fullWidth={open}
          startIcon={<PowerSettingsNewIcon />}
          sx={{
            bgcolor: "#27d6a8",
            color: "white",
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: "bold",
            justifyContent: open ? "flex-start" : "center",
            "& .MuiButton-startIcon": {
              marginRight: open ? 1 : 0,
            },
            "&:hover": {
              bgcolor: "#1fbf94",
            },
          }}
        >
          {open && "Logout"}
        </Button>
      </Box>
    </Drawer>
  );
};

export default DashboardTabs;
