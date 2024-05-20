import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarProps {
  text: string,
  path: string,
  link: string,
  children: React.ReactNode
}
const SidebarItem = ({text, path, link, children}: SidebarProps) => {
  const pathname = usePathname()
  return (
    <div className={`${pathname === path  ? 'active' : ''} flex flex-row items-center py-2 px-4 block rounded transition duration-300 m-1 gap-2 hover:bg-gray-700 cursor-pointer`}>
      {children}
      <Link
        href={link}
        className="text-white "
      >
       {text}
      </Link>
    </div>
  );
};

export default SidebarItem;
