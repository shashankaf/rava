"use client";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";
import localFont from "next/font/local";
import { useRef } from "react";
import QuestionModal from "@/components/QuestionModal";
import Pagination from "@/components/Pagination";
import LoadNumber from "@/components/LoadNumber";
import Search from "@/components/Search";
import DashboardTitle from "@/components/DashboardTitle";

const bbc = localFont({ src: "/../../../app/sarkar_bbc.ttf" });

export default function StudentsTable() {
  const modalRef = useRef(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };
  return (
    <div dir="rtl" className="w-full mt-24 text-black ">
      <div className="flex flex-wrap justify-between">
        <DashboardTitle text=" بەڕێوەبردنی خوێندکاران" />
        <div className="flex flex-wrap flex-row items-center justify-center gap-2">
          <Search />
          <LoadNumber />
        </div>
      </div>
      <table dir="rtl" className={`${bbc.className} table`}>
        <thead className="text-black text-md bg-gray-100">
          <tr>
            <th>ناو</th>
            <th>پۆل</th>
            <th>خوێن</th>
            <th>هاتووچۆ</th>
            <th>رەگەز</th>
            <th className="text-center">دەستکاریی</th>
          </tr>
        </thead>
        <tbody className="text-md border-b-2 border-gray-100">
          <tr className="text-md border-b-2 border-gray-100">
            <td>عەلی عەللاوی</td>
            <td>پۆلی یەک</td>
            <td>O+</td>
            <td>خۆی</td>
            <td>نێر</td>
            <td className="flex gap-x-6 justify-center text-2xl">
              <div
                className="tooltip tooltip-warning text-green-500 cursor-pointer hover:text-green-900 transition-all duration-400"
                data-tip="خوێندنەوە"
              >
                <FaBookOpenReader />
              </div>
              <div
                className="tooltip tooltip-warning text-indigo-500 cursor-pointer hover:text-indigo-900 transition-all duration-400"
                data-tip="نوێکردنەوە"
              >
                <FaEdit />
              </div>
              <div
                className="tooltip tooltip-warning text-red-500 cursor-pointer hover:text-red-900 transition-all duration-400"
                data-tip="سڕینەوە"
                onClick={openModal}
              >
                <RiDeleteBin5Fill />
              </div>
              <QuestionModal text="خوێندکار" modalRef={modalRef} handleClick={() => console.log("hello")} />
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination />
    </div>
  );
}