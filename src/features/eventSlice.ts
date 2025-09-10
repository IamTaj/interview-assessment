import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Event = {
  id: string;
  title: string;
  start: string;
  color: string;
  type: "event" | "reminder";
};

type EventState = {
  events: Event[];
};

const initialState: EventState = {
  events: [],
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    addEvent(
      state,
      action: PayloadAction<{
        title: string;
        date: string;
        color: string;
        type: "event" | "reminder";
      }>
    ) {
      const newItem: Event = {
        id: Date.now().toString(),
        title: action.payload.title,
        start: action.payload.date,
        type: action.payload.type,
        color: action.payload.color,
      };
      state.events.push(newItem);
    },
  },
});

export const { addEvent } = eventSlice.actions;
export default eventSlice.reducer;
