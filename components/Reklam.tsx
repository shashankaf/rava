//@ts-nocheck
"use client";
import HomeSwiper from "./HomeSwiper";
import { useEffect, useState } from "react";
import { Reklam } from "@/lib/types";
import { reklam_fetcher } from "@/lib/fetchers";

export default function Reklam() {
  const [options, setOptions] = useState<Reklam[]>([])
  useEffect(() => {
    const fetchReklam = async () => {
      const data = await reklam_fetcher();
      if (data) {
        setOptions(data)
      }
    };

    fetchReklam();
  }, []);

  return (
    <>
      <HomeSwiper options={options} />
    </>
  );
}
