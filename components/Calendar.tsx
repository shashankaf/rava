"use client"
import React, { useCallback, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
 
const events: any[] = []

const localizer = momentLocalizer(moment);

export default function CalendarComponent() {
  const [date, setDate] = useState(new Date())
  const [view, setView] = useState(Views.WEEK)

  const onNavigate = useCallback((newDate: Date) => setDate(newDate), [setDate])
  const onView = useCallback((newView: any) => setView(newView), [setView])

  return (
    <div className="height600">
      <Calendar
        date={date}
        events={events}
        localizer={localizer}
        onNavigate={onNavigate}
        onView={onView}
        view={view}
      />
    </div>
  )
}

