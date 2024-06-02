//@ts-nocheck
"use client";

import React from "react";
import { useAtom } from "jotai";
import { teacherAtom } from "../../lib/store";
import TeacherUI from "./TeacherUI";

import localFont from "next/font/local";
const bbc = localFont({ src: "../../app/sarkar_bbc.ttf" });

interface teacherProps {
  options: any[];
  text: string;
}
const TeacherComponent = ({ options, text }: teacherProps) => {
  const [selectedOptions, setSelectedOptions] = useAtom<string[]>(teacherAtom);

  const handleOptionToggle = (optionId: string) => {
    const isSelected = selectedOptions.includes(optionId);
    if (isSelected) {
      setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
    } else {
      if (!selectedOptions.includes(optionId)) {
        setSelectedOptions(prev => [...prev, optionId]);
      }
    }
  };

  const handleTeacherClick = (optionId: string) => {
    handleOptionToggle(optionId);
  };

  return (
    <div dir="rtl" className={`${bbc.className} text-xl relative my-4`}>
      <h3 className="text-xl font-bold text-center text-gray-900">{text}</h3>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 justify-center">
        {options?.map((option) => (
          <div key={option.id} className="flex items-center">
            <label className="checkbox-container">
              <input
                type="checkbox"
                id={`option-${option.id}`}
                checked={selectedOptions.includes(option.id)}
                onChange={() => handleOptionToggle(option.id)}
                className="mr-2 text-right hidden"
              />

              <div className="checkmark"></div>
            </label>
            <TeacherUI
              name={option.name}
              specialty={option.specialty}
              image={option.photo}
              onClick={() => handleTeacherClick(option.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherComponent;
