import React from "react";
import localFont from "next/font/local";

const rudaw = localFont({ src: "/../../app/rudaw.ttf" });
const goran = localFont({ src: "/../../app/goran.ttf" });

interface InputProps {
  text: string;
  options: { id: string; title: string }[];
  item: any,
  setItem: any,
}

const Select = ({ text, options, item, setItem }: InputProps) => {
  return (
    <>
    <select className={`${rudaw.className} select w-full max-w-xs input-lg text-white`}>
      <option disabled selected className={`${rudaw.className} text-lg font-bold text-white`}>
        {text}
      </option>
      {options.map(item => {
        return <option key={item.id} className={`${goran.className}`}>{item.title}</option>
      })}
    </select>
    </>
  );
};

export default Select;
