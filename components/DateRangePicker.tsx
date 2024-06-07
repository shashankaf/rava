"use client";

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
  "کانونی یەکەم"
];

interface DateRangePickerProps {
  onSelect: (startDate: Date | null, endDate: Date | null) => void;
}

const DateRangePicker = ({ onSelect }: DateRangePickerProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <div dir="ltr" className={`${bbc.className}`}>
      <DatePicker
        selected={startDate}
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
        renderCustomHeader={({
          date,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled
        }) => (
          <div style={{ margin: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'black' }}>
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} style={{ backgroundColor: 'transparent', color: 'black' }}>
              {"<"}
            </button>
            <select
              value={date.getMonth()}
              onChange={({ target: { value } }) => changeMonth(Number(value))}
              className={`${bbc.className} text-center`}
              style={{ margin: '0 5px', padding: '5px', backgroundColor: 'transparent', color: 'black' }}
            >
              {kurdishMonths.map((month, index) => (
                <option key={index} value={index} style={{ backgroundColor: 'transparent', color: 'black' }}>
                  {month}
                </option>
              ))}
            </select>
            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} style={{ backgroundColor: 'transparent', color: 'black' }}>
              {">"}
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default DateRangePicker;
