import localFont from "next/font/local";
import { MouseEventHandler } from "react";
import { IoMdAddCircle } from "react-icons/io";
const rudaw = localFont({ src: "/../app/rudaw.ttf" });

interface AddBtnProps {
  handleAdd: MouseEventHandler<HTMLDivElement>;
}

export default function AddBtn({ handleAdd }: AddBtnProps) {
  return (
    <div
      role="button" aria-pressed={false}
      className={`${rudaw.className} gap-2 m-2 hover:text-green-900 cursor-pointer transition-all duration-400 py-2 px-4 rounded-md border-2 border-green-600 text-green-600 hover:border-green-900 flex justify-between items-center`}
      onClick={handleAdd}
    >
      <p className="text-xl">زیادکردن</p>
      <div className="text-green-600 text-3xl">
        <IoMdAddCircle />
      </div>
    </div>
  );
}
