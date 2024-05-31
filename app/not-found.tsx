import React from "react";
import localFont from "next/font/local";

const bbc = localFont({ src: "./sarkar_bbc.ttf" });

const NotFound = () => {
  return <div className="min-h-screen w-full flex justify-center items-center">
    <p className={`${bbc.className} text-xl`}>ئەو پەڕەیە نەدۆزرایەوە</p>
  </div>;
};

export default NotFound;
