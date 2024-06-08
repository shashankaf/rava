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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { error, data } = await supabase
          //@ts-ignore
          .from("private_lecture")
          .select(`*, course(*), teacher(*)`);
        if (error) {
          console.log(error);
        }

          //@ts-ignore
        const transformedEvents = transformData(data); 
        //@ts-ignore
        setEvents(transformedEvents); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const transformData = (data: PrivateLecture[]) => {
    return data.map((item: PrivateLecture) => {
      const start = new Date(item.dates[0]);       
      const end = new Date(item.dates[1]);

      const startTime = new Date(item.times[0]);
      const endTime = new Date(item.times[1]); 
      const durationMs = endTime.getTime() - startTime.getTime();
      const endWithDuration = new Date(start.getTime() + durationMs);

      return {
        id: item.id,
        title: `${item.name} - ${item.teacher.name}`,
        start,
        end: endWithDuration, 
      };
    });
  };

  const onNavigation = useCallback((newDate: Date) => setDate(newDate), [setDate]);
  const onView = useCallback((newView: any) => setView(newView), [setView]);

  const formats = {
    weekdayFormat: (date: Date) => weekdayNames[moment(date).format("dddd")], // Customize day format
    monthHeaderFormat: (date: Date) => monthNames[moment(date).format("MMMM")],
    dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
      `${monthNames[moment(start).format("MMMM")]} ${moment(start).format("DD")} – ${monthNames[moment(end).format("MMMM")]} ${moment(end).format("DD")}`,
    dayHeaderFormat: (date: Date) =>
      `${weekdayNames[moment(date).format("dddd")]} ${moment(date).format("DD")} ${monthNames[moment(date).format("MMMM")]}`,
    timeGutterFormat: (date: Date) => moment(date).format("h:mm A"), // Custom time format to include AM/PM
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
      />
    </div>
  );
}
