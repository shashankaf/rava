"use client";
import React, { useState } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Custom Locale Setup for AM/PM
const customLocale = {
  localize: {
    day: (n: number) => ['١ شەمە', '٢ شەمە', '٣ شەمە', '٤ شەمە', '٥ شەمە', 'هەینی', 'شەمە'][n],
    month: (n: number) => ['کانونی دووەم', 'شوبات', 'ئازار', 'نیسان', 'ئایار', 'حوزەیران', 'تەمموز', 'ئاب', 'ئەیلول', 'تشرینی یەکەم', 'تشرینی دووەم', 'کانونی یەکەم'][n],
    ordinalNumber: (n: number, options?: { unit?: string }) => String(n),
    era: (n: number) => (n === 0 ? 'پش زایین' : 'زاینیی'),
    quarter: (n: number) => `Q${n}`,
    dayPeriod: (n: string) => (n === 'am' ? 'بەیانی' : 'ئێوارە')
  },
  formatLong: {
    date: () => 'MM/dd/yyyy',
    time: () => 'HH:mm',
    dateTime: () => 'MM/dd/yyyy HH:mm'
  }
};
//@ts-ignore
registerLocale('custom', customLocale);
setDefaultLocale('custom');

interface TimeRangePickerProps {
  onSelect: (startTime: Date | null, endTime: Date | null) => void;
}

const TimeRangePicker: React.FC<TimeRangePickerProps> = ({ onSelect }) => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const handleStartTimeChange = (time: Date | null) => {
    setStartTime(time);
    onSelect(time, endTime);
  };

  const handleEndTimeChange = (time: Date | null) => {
    setEndTime(time);
    onSelect(startTime, time);
  };

  // Define the min and max times for the time picker
  const minTime = new Date();
  minTime.setHours(9, 0, 0);

  const maxTime = new Date();
  maxTime.setHours(21, 0, 0);

  return (
    <div className="flex gap-2 w-full">
      <DatePicker
        className="input input-md input-bordered text-white"
        selected={startTime}
        onChange={handleStartTimeChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Start Time"
        dateFormat="h:mm aa"
        minTime={minTime}
        maxTime={maxTime}
        placeholderText="کاتی دەستپێک"
      />
      <DatePicker
        className="input input-md input-bordered text-white"
        selected={endTime}
        onChange={handleEndTimeChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="End Time"
        dateFormat="h:mm aa"
        minTime={minTime}
        maxTime={maxTime}
        placeholderText="کاتی کۆتایی"
      />
    </div>
  );
};

export default TimeRangePicker;