import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "../components/Footer";
import localFont from "next/font/local";

const goran = localFont({ src: "./goran.ttf" });

const defaultUrl = process.env.RAVA_URL
  ? `${process.env.RAVA_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Rava Institute",
  description:
    "The top education and empowerment institute in the Kurdistan Region",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${goran.className} w-full bg-white`}>
      <body dir="rtl" className="bg-white">
        <div className="max-w-[1200px] mx-auto">
        <Navbar />
        <main dir="rtl" className="min-h-screen flex flex-col items-center">
          {children}
        </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
