//@ts-nocheck
"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import Image from "next/image";

export default function HomeSwiper({ options }: any) {
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="reklamSwiper"
      >
        {options.map((item) => (
          <SwiperSlide key={item.id}>
            <Image
              src={item.media}
              alt={item.title ?? ""}
              height={1200}
              width={1200}
              className="w-screen h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
