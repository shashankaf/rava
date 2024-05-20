import Image from "next/image";
import React from "react";

interface TopTeacherProps {
  name: string;
  image: string;
  specialty: string;
  popularity_count: string;
}
const TopTeacher = ({
  name,
  image,
  specialty,
  popularity_count,
}: TopTeacherProps) => {
  return (
    <>
      <div className="flex flex-row w-full flex-wrap justify-between items-center p-4 bg-white shadow-lg rounded-lg">
        <div className="flex items-center space-x-4">
          <Image
            src={image}
            alt={name}
            width={200}
            height={200}
            className="rounded-full w-16 h-16 border-[2px] border-purple-400"
          />
          <div className="text-sm">
            <p className="text-gray-900 font-semibold leading-none text-lg m-2">{name}</p>
            <p className="text-gray-400 mx-2">{specialty}</p>
          </div>
        </div>
        <div className="rounded-full bg-purple-600 text-white w-10 h-10 flex justify-center items-center text-md font-bold">
          <p>{popularity_count}</p>
        </div>
      </div>
    </>
  );
};

export default TopTeacher;
