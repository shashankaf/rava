"use client";
import React, { useCallback, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import localFont from "next/font/local";
import { cal_header, monthNames, weekdayNames } from "../lib/calendar";

const bbc = localFont({ src: "/../app/sarkar_bbc.ttf" });

const events: any[] = [];

const localizer = momentLocalizer(moment);

// Extend moment to include custom AM/PM
moment.updateLocale('en', {
  meridiem: (hour: number) => (hour < 12 ? 'بەیانی' : 'ئێوارە'),
});

export default function CalendarComponent() {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(Views.WEEK);

  const onNavigate = useCallback(
    (newDate: Date) => setDate(newDate),
    [setDate],
  );
  const onView = useCallback((newView: any) => setView(newView), [setView]);

  const formats = {
    weekdayFormat: (date: Date) => weekdayNames[moment(date).format("dddd")], // Customize day format
    monthHeaderFormat: (date: Date) => monthNames[moment(date).format("MMMM")],
    dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
      `${monthNames[moment(start).format("MMMM")]} ${moment(start).format("DD")} – ${monthNames[moment(end).format("MMMM")]} ${moment(end).format("DD")}`,
    dayHeaderFormat: (date: Date) =>
      `${weekdayNames[moment(date).format("dddd")]} ${moment(date).format("DD")} ${monthNames[moment(date).format("MMMM")]}`,
    timeGutterFormat: (date: Date) =>
      moment(date).format("h:mm A"), // Custom time format to include AM/PM
    timeRangeStartFormat: (date: Date) =>
      moment(date).hour(8).minute(0).format("h:mm A"), // Start time of range
    timeRangeEndFormat: (date: Date) =>
      moment(date).hour(22).minute(0).format("h:mm A"), // End time of range
  };

  return (
    <div className={`${bbc.className} height600`}>
      <Calendar
        rtl={true}
        date={date}
        events={events}
        localizer={localizer}
        onNavigate={onNavigate}
        onView={onView}
        view={view}
        messages={cal_header}
        formats={formats}
      />
    </div>
  );
}
