import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { useDispatch, useSelector } from "react-redux";
import { setModalStore } from "../../../features/userSlice";
import { RootState } from "@/store/appStore";

const CalendarComponent = () => {
  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.event.events);

  const handleDateClick = (info: { dateStr: string }) => {
    dispatch(
      setModalStore({
        isOpen: true,
        modalType: "eventModal",
        data: {
          selectedDate: info.dateStr,
        },
      })
    );
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          end: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
        events={events}
        dateClick={handleDateClick}
        height="auto"
      />
    </div>
  );
};

export default CalendarComponent;
