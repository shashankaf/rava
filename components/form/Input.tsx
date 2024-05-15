"use client";

import React from "react";
import localFont from "next/font/local";
import { SetStateAction } from "jotai";

const rudaw = localFont({ src: "/../../app/rudaw.ttf" });
const goran = localFont({ src: "/../../app/goran.ttf" });

type SetAtom<Args extends any[], Result> = (...args: Args) => Result;

interface InputProps {
  label: string;
  placeholder: string;
  state: string;
  setState: SetAtom<[SetStateAction<string>], void>;
}

const Input = ({ label, placeholder, state, setState}: InputProps) => {
  return (
    <>
      <label
        className={`${rudaw.className} input input-bordered input-lg 
                        w-full max-w-xs flex items-center gap-2 font-bold 
                        text-lg font-bold text-white`}
      >
        {label}
        <input
          type="text"
          className={`${goran.className} text-sm`}
          placeholder={placeholder}
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </label>
    </>
  );
};

export default Input;
