import React from "react";
import Image from "next/image";
import Hero from "@/components/Hero";
import Carousel from "@/components/Swiper";
import Heading from "@/components/Heading";
import Reklam from "@/components/Reklam";

export default function Index() {
  const logo =
    "https://grocviikgcjxaxnkdvrv.supabase.co/storage/v1/object/public/general/logo2.png?t=2024-05-12T00%3A26%3A34.309Z";
  return (
    <>
      <div className="flex-1 w-full flex flex-col items-center overflow-hidden mx-auto">
        <div className="animate-in flex-1 flex flex-col px-3">
          <main className="flex-1 flex flex-col gap-6 main mt-[80px]">
            <Hero />
            <Reklam />
            <div className="flex flex-col justify-cente items-center my-6">
            <Heading text="مامۆستایانی راڤە بناسە" />
            <Carousel />
            </div>
          </main>
        </div>
        <Image
          src={logo}
          width={400}
          height={400}
          alt="Rava Institute Logo"
          className="absolute top-32 z-0 blur-2xl logo hero-image"
        />
      </div>
    </>
  );
}
