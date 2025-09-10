"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PrintIcon from "@mui/icons-material/Print";

const months = [
  { label: "January", value: 0 },
  { label: "February", value: 1 },
  { label: "March", value: 2 },
  { label: "April", value: 3 },
  { label: "May", value: 4 },
  { label: "June", value: 5 },
  { label: "July", value: 6 },
  { label: "August", value: 7 },
  { label: "September", value: 8 },
  { label: "October", value: 9 },
  { label: "November", value: 10 },
  { label: "December", value: 11 },
];

const SchedulerHeader = () => {
  const [selectedMonth, setSelectedMonth] = useState("");

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <Box
      sx={{
        padding: "16px",
        borderRadius: "12px",
        mb: 2,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        justifyContent={"center"}
        flexWrap="wrap"
        sx={{ p: 2, borderRadius: 4, background: "#ffffff" }}
      >
        <Typography variant="h6" fontWeight={600}>
          Add new schedule(s):
        </Typography>

        <Select
          value={selectedMonth}
          onChange={() => {
            handleMonthChange;
          }}
          displayEmpty
          size="small"
          sx={{
            minWidth: 180,
            backgroundColor: "#ffffff",
            borderRadius: "6px",
            fontSize: "14px",
          }}
        >
          <MenuItem value="">Select Months</MenuItem>
          {months.map((month) => (
            <MenuItem key={month.value} value={month.value}>
              {month.label}
            </MenuItem>
          ))}
        </Select>

        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: "20px",
            backgroundColor: "#00bfa5",
            "&:hover": {
              backgroundColor: "#009e87",
            },
          }}
        >
          Schedule
        </Button>

        <Button
          variant="outlined"
          sx={{
            textTransform: "none",
            borderRadius: "20px",
            color: "#000",
            borderColor: "#ccc",
            backgroundColor: "#fff",
            "&:hover": {
              backgroundColor: "#f0f0f0",
              borderColor: "#aaa",
            },
          }}
        >
          Reset
        </Button>
      </Stack>

      <Divider sx={{ my: 2 }} />
      <Stack direction="row" spacing={2} flexWrap="wrap" mt={2}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            textTransform: "none",
            borderRadius: "20px",
            backgroundColor: "#00bfa5",
            "&:hover": {
              backgroundColor: "#009e87",
            },
          }}
        >
          Replenish
        </Button>

        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          sx={{
            textTransform: "none",
            borderRadius: "20px",
            backgroundColor: "#00bfa5",
            "&:hover": {
              backgroundColor: "#009e87",
            },
          }}
        >
          Delete Schedule
        </Button>

        <Button
          variant="contained"
          startIcon={<FileDownloadIcon />}
          sx={{
            textTransform: "none",
            borderRadius: "20px",
            backgroundColor: "#00bfa5",
            "&:hover": {
              backgroundColor: "#009e87",
            },
          }}
        >
          Export & Download
        </Button>

        <Button
          variant="contained"
          startIcon={<PrintIcon />}
          sx={{
            textTransform: "none",
            borderRadius: "20px",
            backgroundColor: "#00bfa5",
            "&:hover": {
              backgroundColor: "#009e87",
            },
          }}
        >
          Print
        </Button>
      </Stack>
    </Box>
  );
};

export default SchedulerHeader;
