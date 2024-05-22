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
import { useAtom } from "jotai";
import { pageLimitAtom } from "@/lib/store";
import { supabase } from "@/utils/supabase/client";

const bbc = localFont({ src: "/../../../app/sarkar_bbc.ttf" });

interface ShareProps {
  create_at: string,
  id: string,
  course: (string & {created_at: string, title: string}),
  teacher: (string & {created_at: string, name: string}),
  percentage: number,
}

export default function SharesTable() {
  const [shares, setShares] = useState<ShareProps[]>([]);
  const [pageLimit] = useAtom(pageLimitAtom);

  const shareFetcher = async () => {
    try {
      const { data, error } = await supabase
        .from("share")
        .select(`*, teacher(*), course(*)`);
      if (error) throw Error;
      setShares(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    shareFetcher();
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
        <DashboardTitle text=" بەڕێوەبردنی پشکەکان" />
        <div className="flex flex-wrap flex-row items-center justify-center gap-2">
          <Search />
          <LoadNumber />
        </div>
      </div>
      <table dir="rtl" className={`${bbc.className} table`}>
        <thead className="text-black text-md bg-gray-100">
          <tr>
            <th>مامۆستا</th>
            <th>خول</th>
            <th>پشک</th>
            <th className="text-center">دەستکاریی</th>
          </tr>
        </thead>
        <tbody className="text-md border-b-2 border-gray-100">
          {shares.map((share) => {
            return (
              <tr className="text-md border-b-2 border-gray-100">
                <td>{share.teacher.name}</td>
                <td>{share.course.title}</td>
                <td>%{share.percentage}</td>
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
                    text="پشک"
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
