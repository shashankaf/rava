"use client";

import React from "react";
import Image from "next/image";
import Hero from "@/components/Hero";
import Link from "next/link";

export default function Index() {
  const logo =
    "https://grocviikgcjxaxnkdvrv.supabase.co/storage/v1/object/public/general/logo2.png?t=2024-05-12T00%3A26%3A34.309Z";
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center overflow-hidden mx-auto">
      <div className="animate-in flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6 main">
          <Hero />
        </main>
      </div>
      <Image
        src={logo}
        width={800}
        height={1200}
        alt="Rava Institute Logo"
        className="absolute top-32 z-0 blur-2xl logo rotate-45"
      />
      <footer className="w-full flex justify-center text-center text-xs nav">
        <p>
          Build by{" "}
          <Link
            href="https://github.com/shalawfatah"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            @shalawfatah
          </Link>
        </p>
      </footer>
    </div>
  );
}
