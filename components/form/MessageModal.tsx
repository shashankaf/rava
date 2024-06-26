import React from "react";
import localFont from "next/font/local";

const rudaw = localFont({ src: "/../../app/rudaw.ttf" });
interface errorsProps {
  errors: string[],
  success?: boolean,
  setErrors: React.Dispatch<React.SetStateAction<string[]>>
} 
export default function MessageModal({errors, setErrors, success}: errorsProps) {
  const offError = () => {
    setErrors([])
  }
  return (
    <div className={`${rudaw.className}`}>
      {errors.length > 0 && (
        <div dir="rtl" role="alert" className={`${success ? "alert alert-success" : "alert alert-error w-auto"}`}>
          <div onClick={offError}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-12 w-12 hover:stroke-red-800 transition-all duration-400 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          </div>
          <div className="flex flex-col">
            {errors.map((item, index) => (
              <p key={index} className="">{item}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
