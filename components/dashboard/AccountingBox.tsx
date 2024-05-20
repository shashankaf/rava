import React from "react";
import localFont from "next/font/local";

const bbc = localFont({ src: "/../../app/sarkar_bbc.ttf" });

interface AccountingProps {
  text: string;
  money: string;
  children: React.ReactNode;
  color: string;
}
const AccountingBox = ({ text, money, children, color }: AccountingProps) => {
  return (
    <div
      className={`flex flex-col items-center bg-opacity-75	 gap-4 rounded-sm border border-stroke py-4 px-32 ${color} text-white text-3xl`}
    >
      {children}
      <div className="text-center">
        <p className={`${bbc.className} font-bold`}>${money}</p>
        <p className="text-lg">{text}</p>
      </div>
    </div>
  );
};

export default AccountingBox;
