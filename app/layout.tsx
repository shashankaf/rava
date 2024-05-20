import Navbar from "@/components/Navbar";
import "./globals.css";
import localFont from "next/font/local";
import Footer from "@/components/Footer";

const goran = localFont({ src: "./goran.ttf" });

export const metadata = {
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
    <>
      <html lang="en" className={`${goran.className} w-full`}>
        <body dir="rtl" className="bg-white">
          <div className="max-w-[1200px] mx-auto">
            <div>
              <Navbar />
            </div>
            <main dir="rtl" className="min-h-screen flex flex-col items-center">
              {children}
            </main>
          </div>
          <Footer />
        </body>
      </html>
    </>
  );
}
