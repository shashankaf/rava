//@ts-nocheck
"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import localFont from "next/font/local";
import { cal_header, monthNames, weekdayNames } from "../lib/calendar";
import { supabase } from "@/utils/supabase/client";
import { IoMdCloseCircle } from "react-icons/io";
import { update_event } from "@/lib/updater";
import Image from "next/image";

const bbc = localFont({ src: "/../app/sarkar_bbc.ttf" });

const localizer = momentLocalizer(moment);

moment.updateLocale("en", {
  meridiem: (hour) => (hour < 12 ? "بەیانی" : "ئێوارە"),
});

const CustomEvent = ({ event }) => {
  return (
    <div className="custom-event">
      <Image
        src={event.teacherPhoto}
        alt="Teacher"
        height={80}
        width={80}
        className="teacher-photo"
      />
      <div className="event-details">
        <div>{event.title}</div>
      </div>
    </div>
  );
};

export default function CalendarComponent() {
  const [user, setUser] = useState(null);
  const fetcherUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  };

  useEffect(() => {
    fetcherUser();
  }, []);

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

  const onNavigation = useCallback((newDate) => setDate(newDate), [setDate]);
  const onView = useCallback((newView) => setView(newView), [setView]);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedEvent(null);
  };

  const eventPropGetter = (event) => {
    const backgroundColor = event.approved ? "indigo" : "slategray";
    return { style: { backgroundColor } };
  };

  const formats = {
    weekdayFormat: (date) => weekdayNames[moment(date).format("dddd")],
    monthHeaderFormat: (date) => monthNames[moment(date).format("MMMM")],
    dayRangeHeaderFormat: ({ start, end }) =>
      `${monthNames[moment(start).format("MMMM")]} ${moment(start).format("DD")} – ${monthNames[moment(end).format("MMMM")]} ${moment(end).format("DD")}`,
    dayHeaderFormat: (date) =>
      `${weekdayNames[moment(date).format("dddd")]} ${moment(date).format("DD")} ${monthNames[moment(date).format("MMMM")]}`,
    timeGutterFormat: (date) => moment(date).format("h:mm A"),
    timeRangeStartFormat: (date) =>
      moment(date).hour(8).minute(0).format("h:mm A"),
    timeRangeEndFormat: (date) =>
      moment(date).hour(22).minute(0).format("h:mm A"),
  };

  const transformData = (data) => {
    return data.flatMap((item) => {
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
          approved: item.approved,
          teacherPhoto: item.teacher.photo, // Add teacher's photo to the event data
        });
      }

      return result;
    });
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
        eventPropGetter={eventPropGetter}
        min={new Date(1970, 1, 1, 8, 0)}
        max={new Date(1970, 1, 1, 20, 0)}
        components={{
          event: CustomEvent, // Use the custom event component
        }}
      />

      {isPopupOpen && selectedEvent && (
        <div className="popup">
          <div onClick={handleClosePopup} className="cursor-pointer">
            <IoMdCloseCircle
              size={30}
              className="m-4 bg-indigo-600 text-white rounded-full"
            />
          </div>
          <div className="popup-content">
            <h2>{selectedEvent.title}</h2>
            <p>
              دەستپێک:{" "}
              {moment(selectedEvent.start).format("MMMM Do YYYY, h:mm A")}
            </p>
            <p>
              کۆتایی: {moment(selectedEvent.end).format("MMMM Do YYYY, h:mm A")}
            </p>
            {user.email === "shalaw.fatah@gmail.com" ? (
              <div className="block flex flex-wrap flex-row justify-center items-center gap-4 my-4">
                <p
                  onClick={() => update_event(true, selectedEvent.id)}
                  className="btn btn-success text-white"
                >
                  پەسەندکردن
                </p>
                <p
                  onClick={() => update_event(false, selectedEvent.id)}
                  className="btn btn-warning"
                >
                  رەتکردنەوە
                </p>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
