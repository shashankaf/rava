"use client"
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    <div className="flex gap-2">
      <DatePicker
        className="input input-md input-bordered"
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
        className="input input-md input-bordered"
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
