"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import { calendarEvents } from "@/lib/data"; // Ensure this path is correct
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

// Initialize the localizer
const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  // State to manage the current view of the calendar
  const [view, setView] = useState < View > Views.WORK_WEEK;

  // Function to handle view changes
  const handleOnChangeView = (selectedView) => {
    setView(selectedView);
  };

  return (
    <Calendar
      localizer={localizer}
      events={calendarEvents} // Array of events to display on the calendar
      startAccessor="start" // Property name for event start time
      endAccessor="end" // Property name for event end time
      views={["work_week", "day"]} // Available views for the calendar
      view={view} // Current view state
      style={{ height: "98%" }} // Calendar height styling
      onView={handleOnChangeView} // Event handler for view change
      min={new Date(2025, 1, 0, 8, 0, 0)} // Minimum time for the calendar
      max={new Date(2025, 1, 0, 17, 0, 0)} // Maximum time for the calendar
    />
  );
};

export default BigCalendar;
