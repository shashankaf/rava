"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Hero from "@/components/Hero";
import Carousel from "@/components/Carousel";
import Heading from "@/components/Heading";
import Reklam from "@/components/Reklam";
import { supabase } from "@/utils/supabase/client";

export default function Index() {
  useEffect(() => {
    async function requestNotificationPermission() {
      if (Notification.permission === "default") {
        await Notification.requestPermission();
      }
    }
    requestNotificationPermission();
  });

  useEffect(() => {
    const channel = supabase
      .channel("insert lectures")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "private_lecture",
        },
        (payload) => {
          if (Notification.permission === "granted") {
            const name = payload.new.name;
            new Notification("وانەیەکی تایبەت تۆمارکرا", {
              body: `${name} داوای وانەیەکی تایبەتی کردووە`,
            });
          }
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const logo =
    "https://grocviikgcjxaxnkdvrv.supabase.co/storage/v1/object/public/general/logo2.png?t=2024-05-12T00%3A26%3A34.309Z";
  return (
    <>
      <div className="flex-1 w-full flex flex-col items-center overflow-hidden mx-auto">
        <div className="animate-in flex-1 flex flex-col px-3">
          <main className="flex-1 flex flex-col gap-6 main">
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
