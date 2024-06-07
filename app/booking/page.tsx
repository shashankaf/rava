"use client";
import React, { useRef } from "react";
import PrivateModal from "@/components/modals/PrivateModal";
import { IoMdAddCircleOutline } from "react-icons/io";
import GeneralWrapper from "@/components/dashboard/GeneralWrapper";

export default function Booking() {
  const modalRef = useRef<HTMLDialogElement>(null);
  function openModal() {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  }
  return (
    <>
      <GeneralWrapper>
        <section className="p-6 w-full flex justify-center">
        <div
          className="tooltip tooltip-warning text-red-500 cursor-pointer hover:text-red-900 transition-all duration-400"
          data-tip="داواکردنی وانەی تایبەت"
          onClick={openModal}
        >
          <div className="flex gap-x-2 flex-row items-center border-[2px] border-green-700 bg-green-700 text-white py-[2px] px-6 rounded-xl">
            <p className="text-xl text-white font-bold">
            تۆمارکردنی وانەی تایبەت</p>
              <IoMdAddCircleOutline size={30} color={"white"} />
            </div>
          </div>
          <PrivateModal modalRef={modalRef} />
          </section>
      </GeneralWrapper>
    </>
  );
}
