"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';

interface Option {
  id: string;
  media: string;
  title?: string;
}

interface HomeSwiperProps {
  options: Option[];
}

export default function HomeSwiper({ options }: HomeSwiperProps) {
  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="anotherSwiper my-6"
      >
        {options.map((item) => (
          <SwiperSlide key={item.id}>
            <Image
              src={item.media}
              alt={item.title ?? ""}
              height={1200}
              width={1200}
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
