import React from "react";
import localFont from "next/font/local";

const bbc = localFont({ src: "/../app/sarkar_bbc.ttf" });
const rudaw = localFont({ src: "/../app/rudaw.ttf" });

type TextProp = {
  text: string
}
const Title = ({text}: TextProp) => {
  return (
      <h2 className={`${rudaw.className} text-3xl text-center text-gray-800 my-4 drop-shadow-xl`}>{text}</h2>
  );
};

export default Title;
