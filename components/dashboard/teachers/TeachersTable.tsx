"use client";

import { useEffect, useRef, useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";
import QuestionModal from "@/components/QuestionModal";
import Pagination from "@/components/Pagination";
import LoadNumber from "@/components/LoadNumber";
import Search from "@/components/Search";
import DashboardTitle from "@/components/DashboardTitle";
import localFont from "next/font/local";
import { supabase } from "@/utils/supabase/client";
import { pageLimitAtom } from "@/lib/store";
import { useAtom } from "jotai";
import Image from "next/image";

const bbc = localFont({ src: "/../../../app/sarkar_bbc.ttf" });

interface TeacherProps {
  bio: string | null;
  created_at: string;
  id: string;
  name: string;
  order: number | null;
  photo: string;
  specialty: string | null;
}
export default function TeachersTable() {
  const [pageLimit] = useAtom(pageLimitAtom);
  const [teachers, setTeachers] = useState<TeacherProps[]>([]);
  const fetcher = async () => {
    try {
      const { error, data } = await supabase
        .from("teacher")
        .select()
        .limit(pageLimit).order("created_at", {ascending: false});
      if (error) {
        throw Error;
      }
      setTeachers(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetcher();
  }, [pageLimit]);

  const modalRef = useRef(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };
  return (
    <div dir="rtl" className="w-full mt-24 text-black ">
      <div className="flex flex-wrap justify-between">
        <DashboardTitle text=" بەڕێوەبردنی مامۆستایان" />
        <div className="flex flex-wrap flex-row items-center justify-center gap-2">
          <Search />
          <LoadNumber />
        </div>
      </div>
      <table dir="rtl" className={`${bbc.className} table`}>
        <thead className="text-black text-md bg-gray-100">
          <tr>
            <th>ناو</th>
            <th>پسپۆڕیی</th>
            <th>وێنە</th>
            <th className="text-center">دەستکاریی</th>
          </tr>
        </thead>
        <tbody className="text-md border-b-2 border-gray-100">
          {teachers.map((teacher) => {
            return (
              <tr className="text-md border-b-2 border-gray-100">
                <td>{teacher.name}</td>
                <td>{teacher.specialty}</td>
                <td>
                  <Image
                    src={teacher.photo}
                    alt={teacher.name}
                    height={100}
                    width={100}
                    className="rounded-full border-2 border-indigo-600 w-10 h-10"
                  />
                </td>
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
                  <QuestionModal
                    text="مامۆستا"
                    modalRef={modalRef}
                    handleClick={() => console.log("hello")}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
}
