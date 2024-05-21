import localFont from "next/font/local";

const bbc = localFont({ src: "/../app/sarkar_bbc.ttf" });

interface DashboardTitleProps {
  text: string;
  color?: string;
}

export default function DashboardTitle({
  text,
  color = "text-black",
}: DashboardTitleProps) {
  return (
    <h2 className={`${bbc.className} text-xl p-2 ${color} py-4`}>{text}</h2>
  );
}
