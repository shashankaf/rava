import React from "react";
import Title from "./Title";
import localFont from "next/font/local";
import Link from "next/link";

const bbc = localFont({ src: "/../app/sarkar_bbc.ttf" });

const Hero = () => {
  return (
    <div dir="rtl" className="hero min-h-screen w-full bg-transparent">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <Title />
          <Link
            href="/form"
            className={`${bbc.className} btn bg-green-700 text-white text-xl border-0 hover:bg-green-900 transition-all duration-400`}
          >
            فۆرمی خۆتۆمارکردن
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
