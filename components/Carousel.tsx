"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { teacher_fetcher } from "@/lib/fetchers";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/effect-cards';

import { EffectCards } from "swiper/modules";
import { Teacher } from "@/lib/types";

export default function Carousel() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  useEffect(() => {
    const fetchTeachers = async () => {
      const data = await teacher_fetcher();
      if (data) {
        setTeachers(data);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="firstSwiper"
      >
        {teachers.map((item) => {
          return (
            <SwiperSlide key={item.id} className="flex justify-center items-center teacher-swiper">
              <Image
                src={item.photo ?? ""}
                alt={item.name ?? ""}
                height={1200}
                width={1000}
                className="object-cover rounded-b-2xl"
              />
              <div className="absolute bottom-0 bg-inherit py-2">
              <p className="text-md px-6  nav">{item.name}</p>
              <p className="text-sm text-center px-6 nav">{item.specialty}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
