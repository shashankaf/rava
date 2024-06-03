"use client";

import { useState } from "react";
import { FaBars } from "react-icons/fa";
import SidebarItem from "./SidebarItem";
import { MdDashboard } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { FaPercentage } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import localFont from "next/font/local";

const bbc = localFont({ src: "/../../app/sarkar_bbc.ttf" });

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`${bbc.className} flex sidebar`}>
      <div
        className={`inset-y-24 rounded-bl-3xl rounded-tl-3xl right-0 bg-gray-800 text-white transform ${isCollapsed ? "w-16" : "w-64"} transition-all origin-center duration-400 ease-in-out`}
      >
        <div className="flex items-center justify-between p-4">
          <h1
            className={`text-xl font-bold ${isCollapsed ? "hidden" : "block"}`}
          >
            پەیمانگای راڤە
          </h1>
          <button onClick={toggleSidebar} className="focus:outline-none">
            <FaBars />
          </button>
        </div>
        <nav
          className={`flex flex-col mt-5 ${isCollapsed ? "hidden" : "block"}`}
        >
          <SidebarItem text="داشبۆرد" path="/dashboard" link="/dashboard">
            <MdDashboard />
          </SidebarItem>
          <SidebarItem
            text="خوێندکاران"
            path="/dashboard/students"
            link="/dashboard/students"
          >
            <PiStudentFill />
          </SidebarItem>
          <SidebarItem
            text="مامۆستایان"
            path="/dashboard/teachers"
            link="/dashboard/teachers"
          >
            <FaChalkboardTeacher />
          </SidebarItem>
          <SidebarItem
            text="خولەکان"
            path="/dashboard/courses"
            link="/dashboard/courses"
          >
            <FaBookOpen />
          </SidebarItem>
          <SidebarItem
            text="پشکەکان"
            path="/dashboard/shares"
            link="/dashboard/shares"
          >
            <FaPercentage />
          </SidebarItem>
          <SidebarItem
            text="سندوق"
            path="/dashboard/accounting"
            link="/dashboard/accounting"
          >
            <FaMoneyCheckDollar />
          </SidebarItem>
          <SidebarItem
            text="سازاندن"
            path="/dashboard/settings"
            link="/dashboard/settings"
          >
            <IoIosSettings />
          </SidebarItem>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
