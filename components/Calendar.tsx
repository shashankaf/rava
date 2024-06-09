//@ts-nocheck
"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import localFont from "next/font/local";
import { cal_header, monthNames, weekdayNames } from "../lib/calendar";
import { supabase } from "@/utils/supabase/client";
import { PrivateLecture } from "@/lib/types";

const bbc = localFont({ src: "/../app/sarkar_bbc.ttf" });

const localizer = momentLocalizer(moment);

moment.updateLocale("en", {
  meridiem: (hour: number) => (hour < 12 ? "بەیانی" : "ئێوارە"),
});

export default function CalendarComponent() {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(Views.WEEK);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { error, data } = await supabase
          .from("private_lecture")
          .select(`*, subject(*), teacher(*)`);
        if (error) {
          console.log(error);
        }

        const transformedEvents = transformData(data);
        setEvents(transformedEvents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Data transformation function
  const transformData = (data: PrivateLecture[]) => {
    return data.flatMap((item: PrivateLecture) => {
      const [startDateStr, endDateStr] = item.dates;
      const [startTimeStr, endTimeStr] = item.times;

      const startDate = new Date(startDateStr);
      const endDate = new Date(endDateStr);

      const startTime = new Date(startTimeStr).toISOString().split("T")[1];
      const endTime = new Date(endTimeStr).toISOString().split("T")[1];

      const result = [];
      for (
        let date = new Date(startDate);
        date <= endDate;
        date.setDate(date.getDate() + 1)
      ) {
        const dateString = date.toISOString().split("T")[0];

        const startDateTime = new Date(`${dateString}T${startTime}`);
        const endDateTime = new Date(`${dateString}T${endTime}`);

        result.push({
          id: item.id,
          title: `${item.name} - ${item.teacher.name} - ${item.subject.title}`,
          start: startDateTime,
          end: endDateTime,
        });
      }

      return result;
    });
  };

  const onNavigation = useCallback(
    (newDate: Date) => setDate(newDate),
    [setDate],
  );
  const onView = useCallback((newView: any) => setView(newView), [setView]);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedEvent(null);
  };

  const formats = {
    weekdayFormat: (date: Date) => weekdayNames[moment(date).format("dddd")],
    monthHeaderFormat: (date: Date) => monthNames[moment(date).format("MMMM")],
    dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
      `${monthNames[moment(start).format("MMMM")]} ${moment(start).format("DD")} – ${monthNames[moment(end).format("MMMM")]} ${moment(end).format("DD")}`,
    dayHeaderFormat: (date: Date) =>
      `${weekdayNames[moment(date).format("dddd")]} ${moment(date).format("DD")} ${monthNames[moment(date).format("MMMM")]}`,
    timeGutterFormat: (date: Date) => moment(date).format("h:mm A"),
    timeRangeStartFormat: (date: Date) =>
      moment(date).hour(8).minute(0).format("h:mm A"),
    timeRangeEndFormat: (date: Date) =>
      moment(date).hour(22).minute(0).format("h:mm A"),
  };

  return (
    <div className={`${bbc.className} height600`}>
      <Calendar
        rtl={true}
        date={date}
        events={events}
        localizer={localizer}
        onNavigate={onNavigation}
        onView={onView}
        view={view}
        messages={cal_header}
        formats={formats}
        onSelectEvent={handleEventSelect}
      />

      {isPopupOpen && selectedEvent && (
        <div className="popup">
          <div className="popup-content">
            <h2>{selectedEvent.title}</h2>
            <p>
              دەستپێک:{" "}
              {moment(selectedEvent.start).format("MMMM Do YYYY, h:mm A")}
            </p>
            <p>
              کۆتایی: {moment(selectedEvent.end).format("MMMM Do YYYY, h:mm A")}
            </p>
            <button onClick={handleClosePopup}>داخستن</button>
          </div>
        </div>
      )}
    </div>
  );
}
