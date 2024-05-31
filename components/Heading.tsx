import React from "react";
import localFont from "next/font/local";

const rudaw = localFont({ src: "/../app/rudaw.ttf" });

type TextProp = {
  text: string,
  color?: string,
}
const Title = ({text, color="text-gray-800"}: TextProp) => {
  return (
      <h2 className={`${rudaw.className} text-3xl text-center ${color} my-4 drop-shadow-xl`}>{text}</h2>
  );
};

export default Title;
