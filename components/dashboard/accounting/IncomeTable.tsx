//@ts-nocheck
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
import IncomeModal from "@/components/modals/IncomeModal";
import IncomeUpdateModal from "@/components/modals/IncomeUpdateModal";
import { Income } from "@/lib/types";

const bbc = localFont({ src: "/../../../app/sarkar_bbc.ttf" });

export default function IncomeTable() {
  const [income, setIncome] = useState<Income[]>([]);
  const [pageLimit] = useAtom(pageLimitAtom);
  const [incomeToDelete, setIncomeToDelete] = useState(null);
  const [text, setText] = useState<string>("");
  const [filteredIncome, setFilteredIncome] = useState<Income[]>([]);

  const incomeFetcher = async () => {
    try {
      const { data, error } = await supabase
        .from("income")
        .select(`*, student(*), course(*)`);
      if (error) {
        console.log(error);
      }
      setIncome(data);
      setFilteredIncome(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    incomeFetcher();
  }, [pageLimit]);

  const modalRef = useRef(null);
  const incomeRef = useRef(null);
  const updateRef = useRef(null);

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

  const openIncomeModal = () => {
    if (incomeRef.current) {
      incomeRef.current.showModal();
    }
  };

  const handleSearch = (searchText: string) => {
    const filtered = income.filter(
      (item) =>
        item?.student?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        item?.teacher?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        item?.course?.title?.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredIncome(filtered);
  };

  const handleDelete = async () => {
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
        incomeFetcher(); // Refresh the data after deletion
      } catch (error: any) {
        console.error("Error deleting income:", error.message);
      }
    }
  };
  const [incomeToUpdate, setIncomeToUpdate] = useState(null);

  return (
    <div dir="rtl" className="w-full text-black ">
      <div className="flex flex-wrap justify-between">
        <DashboardTitle text=" بەڕێوەبردنی داهات" />
        <AddBtn handleAdd={openIncomeModal} />
        <div className="flex flex-wrap flex-row items-center justify-center gap-2">
          <Search text={text} setText={setText} handleSearch={handleSearch} />
          <LoadNumber />
        </div>
      </div>
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
              <tr className="text-md border-b-2 border-gray-100">
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
      <IncomeUpdateModal modalRef={updateRef} id={incomeToUpdate} />
      <IncomeModal modalRef={incomeRef} />
      <Pagination />
    </div>
  );
}
