"use client";

import React from "react";
import Image from "next/image";
import Title from "@/components/Title";
import Form from "@/components/form/Form";

export default function Index() {
  const logo = "https://grocviikgcjxaxnkdvrv.supabase.co/storage/v1/object/public/general/logo2.png?t=2024-05-12T00%3A26%3A34.309Z"
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center z-2 mt-20">
      <div className="animate-in flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6 main pt-48">
          <Title />
          <Form />
        </main>
      </div>
      <Image
        src={logo}
        width={900}
        height={1200}
        alt="Rava Institute Logo"
        className="absolute top-32 z-0 blur-2xl logo rotate-45"
        />
      <footer className="w-full p-8 flex justify-center text-center text-xs ">
        <p>
          Build by{" "}
          <a
            href="https://github.com/shalawfatah"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            @shalawfatah
          </a>
        </p>
      </footer>
    </div>
  );
}
