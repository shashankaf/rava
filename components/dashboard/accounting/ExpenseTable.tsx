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
import { formatDate } from "@/lib/formatDate";
import AddBtn from "@/components/AddBtn";
import ExpenseModal from "@/components/modals/ExpenseModal";
import ExpenseUpdateModal from "@/components/modals/ExpenseUpdateModal";
import { Expense } from "@/lib/types";

const bbc = localFont({ src: "/../../../app/sarkar_bbc.ttf" });

export default function ExpenseTable() {
  const [expense, setExpense] = useState<Expense[]>([]);
  const [pageLimit] = useAtom(pageLimitAtom);
  const [expenseToUpdate, setExpenseToUpdate] = useState<string>("")
  const [filteredExpense, setFilteredExpense] = useState<Expense[]>([]);
  const [expenseToDelete, setExpenseToDelete] = useState<string>("")

  const expenseFetcher = async () => {
    try {
      const { data, error } = await supabase.from("expense").select(`*, teacher(*), student(*), course(*), items(*)`);
      if (error) {
        console.log(error);
      }
      setExpense(data);
      setFilteredExpense(data)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    expenseFetcher();
  }, [pageLimit]);

  const modalRef = useRef(null);
  const expenseRef = useRef(null);
  const updateRef = useRef(null)

  const openModal = (id: string) => {
    setExpenseToDelete(id);
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const openUpdateModal = (id: string) => {
    setExpenseToUpdate(id)
    if(updateRef.current) {
      updateRef.current.showModal()
    }
  }
  const [text, setText] = useState("");

  const handleSearch = (searchText: string) => {
    const filtered = expense.filter(
      (item) => {
        const textAmount = item?.amount?.toString()
        textAmount?.includes(searchText.toLowerCase()) ||
        item.student?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.teacher?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.course?.title?.toLowerCase().includes(searchText.toLowerCase())
      }
    );
    setFilteredExpense(filtered);
  };

  const openExpenseModal = () => {
    if (expenseRef.current) {
      expenseRef.current.showModal();
    }
  };


  const handleDelete = async () => {
    if (expenseToDelete) {
      try {
        const { error } = await supabase.from("expense").delete().eq("id", expenseToDelete);

        if (error) {
          console.log(error);
        }
        setExpenseToDelete(null);
        expenseFetcher(); 
      } catch (error: any) {
        console.error("Error deleting income:", error.message);
      }
    }
  };


  return (
    <div dir="rtl" className="w-full text-black ">
      <div className="flex flex-wrap justify-between">
        <DashboardTitle text=" بەڕێوەبردنی خەرجی" />
        <AddBtn handleAdd={openExpenseModal} />
        <div className="flex flex-wrap flex-row items-center justify-center gap-2">
          <Search text={text} setText={setText} handleSearch={handleSearch} />
          <LoadNumber />
        </div>
      </div>
      <table dir="rtl" className={`${bbc.className} table`}>
        <thead className="text-black text-md bg-gray-100">
          <tr>
            <th>بڕ</th>
            <th>جۆر</th>
            <th>رێکەوت</th>
            <th className="text-center">دەستکاریی</th>
          </tr>
        </thead>
        <tbody className="text-md border-b-2 border-gray-100">
          {filteredExpense.map((item) => {
            return (
              <tr className="text-md border-b-2 border-gray-100">
                <td>${item.amount}</td>
                <td>{item.expense_type === "course" ? "خول" : "شتومەک"}</td>
                <td>{formatDate(item.created_at)}</td>
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
                    text="خەرجی"
                    modalRef={modalRef}
                    handleClick={handleDelete}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ExpenseUpdateModal modalRef={updateRef} id={expenseToUpdate} />
      <ExpenseModal modalRef={expenseRef} />
      <Pagination />
    </div>
  );
}
