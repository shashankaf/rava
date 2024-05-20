import localFont from "next/font/local";

const rudaw = localFont({ src: "/../app/rudaw.ttf" });

type DividerProps = {
  text: string
}
export default function Divider({ text }:DividerProps) {
  return (
    <div className={`${rudaw.className} divider text-xl text-gray-500 my-8`}>
      {text}
    </div>
  );
}
