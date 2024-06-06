//@ts-nocheck
"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import QuestionModal from "@/components/QuestionModal";
import Pagination from "@/components/Pagination";
import localFont from "next/font/local";
import { useAtom } from "jotai";
import { pageLimitAtom, pageNumberAtom } from "@/lib/store"; // Import pageNumberAtom
import { supabase } from "@/utils/supabase/client";
import IncomeModal from "@/components/modals/IncomeModal";
import IncomeUpdateModal from "@/components/modals/IncomeUpdateModal";
import { Income } from "@/lib/types";
import IncomeTableWrapper from "./IncomeTableWrapper";

const bbc = localFont({ src: "/../../../app/sarkar_bbc.ttf" });

export default function IncomeTable() {
  const [income, setIncome] = useState<Income[]>([]);
  const [filteredIncome, setFilteredIncome] = useState<Income[]>([]);
  const [pageLimit] = useAtom(pageLimitAtom);
  const [pageNumber, setPageNumber] = useAtom(pageNumberAtom); // Add pageNumber atom
  const [totalIncome, setTotalIncome] = useState(0); // Add totalIncome state
  const [incomeToDelete, setIncomeToDelete] = useState(null);
  const [incomeToUpdate, setIncomeToUpdate] = useState(null);

  const incomeFetcher = async () => {
    try {
      const { data, error, count } = await supabase
        .from("income")
        .select(`*, student(*), course(*)`, { count: "exact" })
        .range((pageNumber - 1) * pageLimit, pageNumber * pageLimit - 1);
      if (error) {
        console.log(error);
      } else {
        setIncome(data);
        setFilteredIncome(data);
        setTotalIncome(count ?? 0); // Fallback to 0 if count is null
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    incomeFetcher();
  }, [pageLimit, pageNumber]);

  const modalRef = useRef<HTMLDialogElement>(null);
  const incomeRef = useRef<HTMLDialogElement>(null);
  const updateRef = useRef<HTMLDialogElement>(null);

  const openModal = (id: string) => {
    setIncomeToDelete(id);
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const openUpdateModal = (id: string) => {
    setIncomeToUpdate(id);
    if (updateRef.current) {
      updateRef.current.showModal();
    }
  };

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (incomeToDelete) {
      try {
        const { error } = await supabase
          .from("income")
          .delete()
          .eq("id", incomeToDelete);

        if (error) {
          console.log(error);
        }
        setIncomeToDelete(null);
        incomeFetcher();
      } catch (error: any) {
        console.error("Error deleting income:", error.message);
      }
    }
  };

  return (
    <>
      <IncomeTableWrapper income={income} incomeRef={incomeRef}>
        <div className="overflow-x-auto">
          <table dir="rtl" className={`${bbc.className} table`}>
            <thead className="text-black text-md bg-gray-100">
              <tr>
                <th>بڕ</th>
                <th>خوێندکار</th>
                <th>خول</th>
                <th className="text-center">دەستکاریی</th>
              </tr>
            </thead>
            <tbody className="text-md border-b-2 border-gray-100">
              {filteredIncome.map((item) => {
                return (
                  <tr
                    className="text-md border-b-2 border-gray-100"
                    key={item.id}
                  >
                    <td>${item.amount}</td>
                    <td>{item.student?.name}</td>
                    <td>{item.course?.title}</td>
                    <td className="flex gap-x-6 justify-center text-2xl">
                      <div
                        className="tooltip tooltip-warning text-indigo-500 cursor-pointer hover:text-indigo-900 transition-all duration-400"
                        data-tip="نوێکردنەوە"
                        onClick={() => openUpdateModal(item.id)}
                      >
                        <FaEdit />
                      </div>
                      <div
                        className="tooltip tooltip-warning text-red-500 cursor-pointer hover:text-red-900 transition-all duration-400"
                        data-tip="سڕینەوە"
                        onClick={() => openModal(item.id)}
                      >
                        <RiDeleteBin5Fill />
                      </div>
                      <QuestionModal
                        text="داهات"
                        modalRef={modalRef}
                        handleClick={handleDelete}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </IncomeTableWrapper>
      <IncomeUpdateModal modalRef={updateRef} id={incomeToUpdate} />
      <IncomeModal modalRef={incomeRef} />
      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        totalItems={totalIncome}
        pageLimit={pageLimit}
      />
    </>
  );
}
