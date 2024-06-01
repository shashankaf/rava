import React from "react";
import localFont from "next/font/local";

const bbc = localFont({ src: "/../app/sarkar_bbc.ttf" });

const Title = () => {
  return (
    <div className={`${bbc.className} content flex flex-col justify-center items-center my-8`}>
      <h1 className={`${bbc.className} lg:text-7xl text-4xl text-gray-800 my-2 drop-shadow-xl font-black`}>پەیمانگای راڤە</h1>
      <h2 className="lg:text-5xl text-3xl text-gray-900 font-black my-2 drop-shadow-xl">ناوازە و تاقانەکەی شار</h2>
    </div>
  );
};

export default Title;
