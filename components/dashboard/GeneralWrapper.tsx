"use client";

import React from "react";
import localFont from "next/font/local";
const rudaw = localFont({ src: "/../../app/rudaw.ttf" });

export default function GeneralWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      dir="rtl"
      className={`${rudaw.className} text-black pt-20 xs:w-screen p-4`}
    >
      {children}
    </div>
  );
}
