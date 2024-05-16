"use client";

import React from "react";
import localFont from "next/font/local";

const rudaw = localFont({ src: "/../../app/rudaw.ttf" });
const goran = localFont({ src: "/../../app/goran.ttf" });

interface InputProps {
  text: string;
  options: { id: string; title: string }[];
  onSelectChange: (value: string) => void; // Callback function to handle selected value
}

const Select = ({ text, options, onSelectChange }: InputProps) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onSelectChange(selectedValue); // Call the callback function with selected value
  };

  return (
    <>
      <select
        className={`${rudaw.className} select w-full max-w-xs input-lg text-white`}
        onChange={handleSelectChange}
      >
        <option disabled value="">
          {text}
        </option>
        {options.map((item) => (
          <option
            key={item.id}
            value={item.id}
            className={`${goran.className}`}
          >
            {item.title}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;