"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import QuestionModal from "@/components/QuestionModal";
import Pagination from "@/components/Pagination";
import localFont from "next/font/local";
import { useAtom } from "jotai";
import { pageLimitAtom } from "@/lib/store";
import { supabase } from "@/utils/supabase/client";
import ShareUpdateModal from "@/components/modals/ShareUpdateModal";
import { Share } from "@/lib/types";
import SharesTableWrapper from "./SharesTableWrapper";

const bbc = localFont({ src: "/../../../app/sarkar_bbc.ttf" });
export default function SharesTable() {
  const [shares, setShares] = useState<Share[]>([]);
  const [pageLimit] = useAtom(pageLimitAtom);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const shareFetcher = async (page: number, limit: number) => {
    try {
      const from = (page - 1) * limit;
      const to = page * limit - 1;
      const { data, error, count } = await supabase
        .from("share")
        .select(`*, teacher(*), course(*)`, { count: "exact" })
        .range(from, to);
      if (error) throw error;
      setShares(data);
      setFilteredShares(data);
      if (count !== null) {
        const calculatedTotalPages = Math.ceil(count / limit);
        if (calculatedTotalPages > 0 && currentPage <= calculatedTotalPages) {
          setTotalPages(calculatedTotalPages);
        } else {
          setCurrentPage(calculatedTotalPages > 0 ? calculatedTotalPages : 1);
        }
      }

    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    shareFetcher(currentPage, pageLimit);
  }, [currentPage, pageLimit]);

  const modalRef = useRef<HTMLDialogElement>(null);
  const updateRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const [shareToUpdate, setShareToUpdate] = useState<string | null>(null);
  const handleUpdate = (id: string) => {
    setShareToUpdate(id);
    if (updateRef.current) {
      updateRef.current.showModal();
    }
  };

  const [filteredShares, setFilteredShares] = useState<Share[]>([]);

  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async (id: string, e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("share").delete().eq("id", id);

      if (error) {
        throw error;
      }
      modalRef?.current?.close();
      shareFetcher(currentPage, pageLimit);
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

  return (
    <>
      <SharesTableWrapper shares={shares}>
        <div className="overflow-x-auto">
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
                    <td>{share?.teacher?.name}</td>
                    <td>{share?.course?.title}</td>
                    <td>%{share?.percentage}</td>
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
                        handleClick={(e: MouseEvent<HTMLButtonElement>) =>
                          handleDelete(share.id, e)
                        }
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SharesTableWrapper>
      <ShareUpdateModal id={shareToUpdate} modalRef={updateRef} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
