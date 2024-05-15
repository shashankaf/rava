import React from "react";
import Link from "next/link";

interface menuItemProps {
  text: string,
  link: string
}
const MenuItem = ({text, link}: menuItemProps) => {
  return (
    <>
      <Link
        className="px-4 py-[2px] rounded-lg hover:bg-orange-300 transition duration-400 ease-in-out"
        href={link}
      >
        {text}
      </Link>
    </>
  );
};

export default MenuItem;
