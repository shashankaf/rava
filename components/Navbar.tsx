"use client";
import { useState } from "react";
import Image from "next/image";
import MenuItem from "./MenuItem";
import localFont from "next/font/local";
import { FaBars } from "react-icons/fa"; // Import the burger icon

const shasenem = localFont({ src: "/../app/shasenem.ttf" });
const bbc = localFont({ src: "/../app/sarkar_bbc.ttf" });

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu open/close
  const rava =
    "https://grocviikgcjxaxnkdvrv.supabase.co/storage/v1/object/public/general/rava-removebg-preview.png";

  return (
    <div
      className={`${shasenem.className} fixed flex flex-row bg-white justify-between w-full nav border-b-[2px] border-gray-100`}
    >
      <div className="hidden md:flex flex-row items-center gap-x-2 text-lg text-gray-800 mx-6">
        <MenuItem text="ماڵەوە" link="/" />
        <MenuItem text="مامۆستایان" link="/teachers" />
        <MenuItem text="فۆرم" link="/form" />
        <MenuItem text="پەیوەندی" link="/contact" />
      </div>
      <div className="flex items-center justify-between w-full">
        <div>
          <Image src={rava} width={75} height={75} alt="Rava Institute Logo" />
        </div>
        <div>&nbsp;</div>
        <div>
          <FaBars
            className="text-2xl ml-4 cursor-pointer md:hidden text-black"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>
      </div>
      {menuOpen && (
        <div
          className={`${bbc.className} fixed inset-0 bg-white flex flex-col justify-center items-center z-50 text-black gap-y-4`}
        >
          <MenuItem text="ماڵەوە" link="/" onClick={() => setMenuOpen(false)} />
          <MenuItem
            text="مامۆستایان"
            link="/teachers"
            onClick={() => setMenuOpen(false)}
          />
          <MenuItem
            text="فۆرم"
            link="/form"
            onClick={() => setMenuOpen(false)}
          />
          <MenuItem
            text="پەیوەندی"
            link="/contact"
            onClick={() => setMenuOpen(false)}
          />
        </div>
      )}
    </div>
  );
}

export default Navbar;
