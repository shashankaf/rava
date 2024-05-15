import Image from "next/image";
import MenuItem from "./MenuItem";
import { createClient } from "../utils/supabase/server";
import AuthButton from "./AuthButton";
import localFont from "next/font/local";

const shasenem = localFont({ src: "/../app/shasenem.ttf" });

function Navbar() {
  const rava =
    "https://grocviikgcjxaxnkdvrv.supabase.co/storage/v1/object/public/general/rava-removebg-preview.png";
  const canInitSupabaseClient = () => {
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();
  return (
    <div
      className={`${shasenem.className} fixed max-w-[1200px] flex flex-row justify-between w-full nav border-b-[2px] border-gray-100`}
    >
      <div className="flex flex-row items-center gap-x-2 text-lg text-gray-800 mx-6">
        <MenuItem text="ماڵەوە" link="/" />
        <MenuItem text="مامۆستایان" link="/teachers" />
        <MenuItem text="فۆرم" link="/form" />
        <MenuItem text="پەیوەندی" link="/contact" />
        {isSupabaseConnected && <AuthButton />}
      </div>
      <div>
        <Image src={rava} width={75} height={75} alt="Rava Institute Logo" />
      </div>
    </div>
  );
}

export default Navbar;
