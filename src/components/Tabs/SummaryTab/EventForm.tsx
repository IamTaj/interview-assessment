import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeModalStore } from "@/features/userSlice";
import { RootState } from "@/store/appStore";
import { addEvent } from "@/features/eventSlice";

const EventForm = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(
    (state: RootState) => state?.user?.modalStore?.data?.selectedDate || ""
  );

  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState<"event" | "reminder">("event");

  const [errors, setErrors] = useState<{ title?: string; date?: string }>({});

  const onCancel = () => {
    dispatch(closeModalStore());
  };

  const validate = () => {
    const newErrors: { title?: string; date?: string } = {};
    if (!title.trim()) newErrors.title = "Title is required.";
    if (!selectedDate) newErrors.date = "Date is not selected.";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validate();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});

    dispatch(
      addEvent({
        title,
        date: selectedDate,
        type: eventType,
        color: eventType === "event" ? "#77a7f5ff" : "#FFA500",
      })
    );
    dispatch(closeModalStore());
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, minWidth: 300 }}>
      <Typography variant="h6" mb={2}>
        Add Event
      </Typography>

      <TextField
        label="Date"
        value={selectedDate}
        fullWidth
        margin="normal"
        InputProps={{ readOnly: true }}
        error={!!errors.date}
        helperText={errors.date}
      />

      <TextField
        label="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
        placeholder="Enter event title"
        error={!!errors.title}
        helperText={errors.title}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel id="event-type-label">Event Type</InputLabel>
        <Select
          labelId="event-type-label"
          value={eventType}
          label="Event Type"
          onChange={(e) => setEventType(e.target.value as "event" | "reminder")}
        >
          <MenuItem value="event">Event</MenuItem>
          <MenuItem value="reminder">Reminder</MenuItem>
        </Select>
      </FormControl>

      <Stack direction="row" spacing={2} mt={3} justifyContent="flex-end">
        <Button
          variant="contained"
          onClick={onCancel}
          sx={{
            textTransform: "none",
            backgroundColor: "#00bfa5",
            "&:hover": {
              backgroundColor: "#009e87",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: "#00bfa5",
            "&:hover": {
              backgroundColor: "#009e87",
            },
          }}
        >
          Add
        </Button>
      </Stack>
    </Box>
  );
};

export default EventForm;
