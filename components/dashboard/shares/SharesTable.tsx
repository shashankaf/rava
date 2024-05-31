"use client";

import { useEffect, useRef, useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import QuestionModal from "@/components/QuestionModal";
import Pagination from "@/components/Pagination";
import LoadNumber from "@/components/LoadNumber";
import Search from "@/components/Search";
import DashboardTitle from "@/components/DashboardTitle";
import localFont from "next/font/local";
import { useAtom } from "jotai";
import { pageLimitAtom } from "@/lib/store";
import { supabase } from "@/utils/supabase/client";
import AddBtn from "@/components/AddBtn";
import { useRouter } from "next/navigation";
import ShareUpdateModal from "@/components/modals/ShareUpdateModal";
import { Share } from "@/lib/types";

const bbc = localFont({ src: "/../../../app/sarkar_bbc.ttf" });
export default function SharesTable() {
  const [shares, setShares] = useState<Share[]>([]);
  const [pageLimit] = useAtom(pageLimitAtom);

  const shareFetcher = async () => {
    try {
      const { data, error } = await supabase
        .from("share")
        .select(`*, teacher(*), course(*)`);
      if (error) throw Error;
      setShares(data);
      setFilteredShares(data);
    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {
    shareFetcher();
  }, [pageLimit]);

  const modalRef = useRef(null);
  const updateRef = useRef(null)

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

const [shareToUpdate, setShareToUpdate] = useState<string | null>(null)
  const handleUpdate = (id: string) => {
    setShareToUpdate(id)
    if(updateRef.current) {
      updateRef.current.showModal()
    }
  }



  const [text, setText] = useState("");
  const [filteredShares, setFilteredShares] = useState<Share[]>([]);

  const handleSearch = (searchText: string) => {
    const filtered = shares.filter(
      (share) =>
        share?.teacher?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        share?.course?.title?.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredShares(filtered);
  };

  const [isDeleted, setIsDeleted] = useState(false)

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("share").delete().eq("id", id);

      if (error) {
        throw error;
      }
      setIsDeleted(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isDeleted) {
      setIsDeleted(false); // Reset state
      window.location.reload(); // Refresh the page
    }
  }, [isDeleted]);

  const router = useRouter()

  return (
    <div dir="rtl" className="w-full mt-24 text-black ">
      <div className="flex flex-wrap justify-between">
        <DashboardTitle text=" بەڕێوەبردنی پشکەکان" />
        <AddBtn handleAdd={() => router.push("/dashboard/shares/create")} />
        <div className="flex flex-wrap flex-row items-center justify-center gap-2">
          <Search text={text} setText={setText} handleSearch={handleSearch} />
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
          {filteredShares.map((share) => {
            return (
              <tr className="text-md border-b-2 border-gray-100">
                <td>{share.teacher.name}</td>
                <td>{share.course.title}</td>
                <td>%{share.percentage}</td>
                <td className="flex gap-x-6 justify-center text-2xl">
                  <div
                    className="tooltip tooltip-warning text-indigo-500 cursor-pointer hover:text-indigo-900 transition-all duration-400"
                    data-tip="نوێکردنەوە"
                    onClick={() => handleUpdate(share.id)}
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
                    handleClick={() => handleDelete(share.id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ShareUpdateModal id={shareToUpdate} modalRef={updateRef} />
      <Pagination />
    </div>
  );
}
