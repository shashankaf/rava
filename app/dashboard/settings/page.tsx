import React from "react"
import localFont from "next/font/local";

const rudaw = localFont({ src: "../../rudaw.ttf" });

const Settings = () => {
  return (
  <div dir="rtl" className={`${rudaw.className} mt-24`}>
      <button className="btn btn-error btn-md text-white">دەرچوون لە داشبۆرد</button>
  </div>
  )
}

export default Settings
