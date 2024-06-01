import React from "react";
import Link from "next/link";

interface menuItemProps {
  text: string,
  link: string
  onClick?: () => void;
}
const MenuItem = ({text, link, onClick}: menuItemProps) => {
  return (
    <div onClick={onClick}>
      <Link
        className="px-4 py-[2px] rounded-lg hover:bg-orange-300 transition duration-400 ease-in-out"
        href={link}
      >
        {text}
      </Link>
    </div>
  );
};

export default MenuItem;
