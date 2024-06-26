import React from "react";
import SocialMedia from "@/components/SocialMedia";
import Heading from "@/components/Heading";
import localFont from "next/font/local";
import InfoSection from "@/components/InfoSection";
import GeneralWrapper from "@/components/dashboard/GeneralWrapper";

const rudaw = localFont({ src: "../rudaw.ttf" });

const Contact = () => {
  const insta_link = "https://google.com";
  ("https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2Frava_institute%3Figsh%3DNXpkaGQweGZvZDZ4%26fbclid%3DIwZXh0bgNhZW0CMTAAAR28UQlXb9yY0o6k0XW68O5jB4vbltzNexlVzw00lmTPjGsfoMjGnGAsiZM_aem_Ad5HpPTMNk15DVDMBT_5C9iOqNcvEKra5wXL2xa1GwdL8b_vo-kJEmGpOzsxs9sC1Lih0TSsYooUx_rqCA1Hz873&h=AT2cXvq6WzE4YaqI1ss8nb_SWFx3WstFERAOsjXrh795tpYZUyiZfzXIKHRvlFu1mmnfNVhQbyZ6q9Frg4TRqbQh8kEnfhM1hUGshuVJBq_6krfbKVfy8vz7fBTMOhv9p9Zrz6q9");
  const rava_map =
    "https://maps.google.com/maps?q=rava+institute&t=&z=13&ie=UTF8&iwloc=&output=embed";
  const face_link = "https://www.facebook.com/rava.institute";
  return (
    <GeneralWrapper>
      <div dir="rtl" className={`${rudaw.className} w-full`}>
        <div className="container md:px-6">
          <section className=" text-center">
            <div className="py-12 md:px-12">
              <Heading text="پەیوەندی بکە بە راڤەوە" />
              <InfoSection />
              <div className="container xl:px-32">
                <div className="grid items-center lg:grid-cols-2">
                  <div className="mb-12 md:mt-12 lg:mt-0 lg:mb-0">
                    <div className="relative z-[1] block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] dark:bg-[hsla(0,0%,5%,0.7)] dark:shadow-black/20 md:px-12 lg:-mr-14">
                      <h2 className="mb-12 text-3xl font-bold text-gray-900">
                        نامە ناردن
                      </h2>
                      <form>
                        <div
                          className="relative mb-6"
                          data-te-input-wrapper-init
                        >
                          <input
                            type="text"
                            className="border-[2px] border-gray-200 peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleInput90"
                            placeholder="ناو"
                          />
                          <label
                            className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                            htmlFor="exampleInput90"
                          >
                            ناو
                          </label>
                        </div>
                        <div
                          className="relative mb-6"
                          data-te-input-wrapper-init
                        >
                          <input
                            type="email"
                            className="border-[2px] border-gray-200 peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleInput91"
                            placeholder="ئیمەیل"
                          />
                          <label
                            className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                            htmlFor="exampleInput91"
                          >
                            ئیمەیل
                          </label>
                        </div>
                        <div
                          className="relative mb-6"
                          data-te-input-wrapper-init
                        >
                          <textarea
                            className="border-[2px] border-gray-200 peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleFormControlTextarea1"
                            rows={3}
                            placeholder="نامەکەت"
                          ></textarea>
                          <label
                            htmlFor="exampleFormControlTextarea1"
                            className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                          >
                            نامە
                          </label>
                        </div>
                        <button
                          type="button"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          className="inline-block w-full rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] lg:mb-0"
                        >
                          ناردن
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="md:mb-12 lg:mb-0">
                    <div className="relative h-[700px] rounded-lg shadow-lg dark:shadow-black/20">
                      <iframe
                        src={rava_map}
                        className="absolute left-0 top-0 h-full w-full rounded-lg"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Heading text="فۆلۆومان بکە لە تۆڕە کۆمەڵایەتیەکان" />
            <SocialMedia />
          </section>
        </div>
      </div>
    </GeneralWrapper>
  );
};

export default Contact;
