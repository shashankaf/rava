//@ts-nocheck
import React from "react";
import Image from "next/image";
import Form from "@/components/form/Form";
import { supabase } from "@/utils/supabase/client";



export default async function FormPage() {
  const { error, data } = await supabase.rpc("fetch_all_data").select();
  if (error) {
    console.log(error);
  }
  const logo =
    "https://grocviikgcjxaxnkdvrv.supabase.co/storage/v1/object/public/general/logo2.png";
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="animate-in flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6 main pt-24">
          <Form
            ragazakan={data?.ragaz}
            bloods={data?.blood}
            classes={data.class}
            travels={data?.travel}
            courses={data.course}
          />
        </main>
      </div>
      <Image
        src={logo}
        width={900}
        height={1200}
        alt="Rava Institute Logo"
        className="absolute top-32 z-0 blur-2xl logo"
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
