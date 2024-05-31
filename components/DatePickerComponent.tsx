import React, { Dispatch } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "@/lib/formatDate";
import localFont from "next/font/local";
import { SetStateAction } from "jotai";

const bbc = localFont({ src: "../app/sarkar_bbc.ttf" });

interface Dates {
  label: string;
  selectedDate: Date | null;  
  setSelectedDate: Dispatch<SetStateAction<Date>>;
}

const DatePickerComponent: React.FC<Dates> = ({ label, selectedDate, setSelectedDate }) => {
  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  return (
    <div dir="rtl" className={`${bbc.className}`}>
      <label htmlFor="datePicker" className="block text-xl font-bold">
        بەرواری {label}
      </label>
      <DatePicker
        id="datePicker"
        selected={selectedDate}
        onChange={handleDateChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                     focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p className="mt-2 text-sm text-gray-500">
        {selectedDate ? formatDate(selectedDate) : `رۆژی ${label} دیاری نەکراوە`}
      </p>
    </div>
  );
};

export default DatePickerComponent;
