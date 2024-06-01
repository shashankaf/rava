"use client";

import React from "react";
import localFont from "next/font/local";

const goran = localFont({ src: "/../../app/goran.ttf" });
const bbc = localFont({ src: "/../../app/sarkar_bbc.ttf" });

interface InputProps {
  label: string;
  placeholder: string;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const Input = ({ label, placeholder, state, setState}: InputProps) => {
  return (
    <>
      <label
        className={`${bbc.className} input input-bordered input-lg 
                        w-full max-w-xs flex items-center gap-2 font-bold 
                        text-lg font-bold text-white bg-gray-800`}
      >
        {label}
        <input
          type="text"
          className={`${goran.className} text-sm bg-gray-800 px-0`}
          placeholder={placeholder}
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </label>
    </>
  );
};

export default Input;
