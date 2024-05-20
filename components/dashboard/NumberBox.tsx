import React from "react";

interface NumberBoxProps {
  title: string;
  number: number;
}

const NumberBox = ({ title, number }: NumberBoxProps) => {
  return (
    <div className="flex flex-col justify-center">
      <h3 className="text-gray-800 text-xl font-black text-red-700">{title}</h3>
      <div className="rounded-full border-4 border-purple-600 w-32 my-6">
        <h2 className="text-indigo-800 font-black text-4xl py-10 text-center">
          {number}
        </h2>
      </div>
    </div>
  );
};

export default NumberBox;
