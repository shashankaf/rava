"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import localFont from "next/font/local";

const bbc = localFont({ src: "/../app/sarkar_bbc.ttf" });

// Kurdish month names
const kurdishMonths = [
  "کانونی دووەم",
  "شوبات",
  "ئازار",
  "نیسان",
  "ئایار",
  "حوزەیران",
  "تەموز",
  "ئاب",
  "ئەيلول",
  "تشرینی یەکەم",
  "تشرینی دووەم",
  "کانونی یەکەم",
];

interface DateRangePickerProps {
  onSelect: (startDate: Date | null, endDate: Date | null) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onSelect }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <div dir="ltr" className={`${bbc.className} w-full`}>
      <DatePicker
        locale="ku"
        selected={startDate}
        withPortal
        onChange={(dates) => {
          const [start, end] = dates as [Date | null, Date | null];
          setStartDate(start);
          setEndDate(end);
          onSelect(start, end);
        }}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        calendarClassName="" // Ensures the calendar takes the full width
        renderCustomHeader={({
          date,
          changeMonth,
        }) => (
          <div
            style={{
              margin: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "black",
            }}
          >
            <select
              value={date.getMonth()}
              onChange={({ target: { value } }) => changeMonth(Number(value))}
              className={`${bbc.className} text-center`}
              style={{
                margin: "0 5px",
                padding: "5px",
                backgroundColor: "transparent",
                color: "black",
              }}
            >
              {kurdishMonths.map((month, index) => (
                <option
                  key={index}
                  value={index}
                  style={{ backgroundColor: "transparent", color: "black" }}
                >
                  {month}
                </option>
              ))}
            </select>
          </div>
        )}
      />
    </div>
  );
};

export default DateRangePicker;
