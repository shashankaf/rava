import React from "react";
import localFont from "next/font/local";

const sarchia = localFont({ src: "/../app/sarchia.ttf" });
const rudaw = localFont({ src: "/../app/rudaw.ttf" });
const bbc = localFont({ src: "/../app/sarkar_bbc.ttf" });

const Title = () => {
  return (
    <div className={`${bbc.className} content flex flex-col justify-center items-center my-8`}>
      <h1 className={`${bbc.className} text-7xl text-gray-800 my-2 drop-shadow-xl font-black`}>پەیمانگای راڤە</h1>
      <h2 className="text-5xl text-indigo-600 my-2 drop-shadow-xl">ناوازە و تاقانەکەی شار</h2>
    </div>
  );
};

export default Title;
