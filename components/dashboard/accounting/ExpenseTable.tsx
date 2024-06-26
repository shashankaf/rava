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
import { formatDate } from "@/lib/formatDate";
import ExpenseModal from "@/components/modals/ExpenseModal";
import ExpenseUpdateModal from "@/components/modals/ExpenseUpdateModal";
import { Expense } from "@/lib/types";
import ExpenseTableWrapper from "./ExpenseTableWrapper";

const bbc = localFont({ src: "/../../../app/sarkar_bbc.ttf" });

export default function ExpenseTable() {
  const [expense, setExpense] = useState<Expense[]>([]);
  const [filteredExpense, setFilteredExpense] = useState<Expense[]>([]);
  const [pageLimit] = useAtom(pageLimitAtom);
  const [pageNumber, setPageNumber] = useAtom(pageNumberAtom); // Add pageNumber atom
  const [totalExpense, setTotalExpense] = useState(0); // Add totalExpense state
  const [expenseToUpdate, setExpenseToUpdate] = useState<string>("");
  const [expenseToDelete, setExpenseToDelete] = useState<string>("");

  const expenseFetcher = async () => {
    try {
      const { data, error, count } = await supabase
        .from("expense")
        .select(`*, teacher(*), student(*), course(*), items(*)`, { count: "exact" })
        .range((pageNumber - 1) * pageLimit, pageNumber * pageLimit - 1);
      if (error) {
        console.log(error);
      } else {
        setExpense(data);
        setFilteredExpense(data);
        setTotalExpense(count ?? 0); // Fallback to 0 if count is null
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    expenseFetcher();
  }, [pageLimit, pageNumber]);

  const modalRef = useRef<HTMLDialogElement>(null);
  const expenseRef = useRef<HTMLDialogElement>(null);
  const updateRef = useRef<HTMLDialogElement>(null);

  const openModal = (id: string) => {
    setExpenseToDelete(id);
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const openUpdateModal = (id: string) => {
    setExpenseToUpdate(id);
    if (updateRef.current) {
      updateRef.current.showModal();
    }
  };

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (expenseToDelete) {
      try {
        const { error } = await supabase
          .from("expense")
          .delete()
          .eq("id", expenseToDelete);

        if (error) {
          console.log(error);
        }
        setExpenseToDelete(null);
        expenseFetcher();
      } catch (error: any) {
        console.error("Error deleting expense:", error.message);
      }
    }
  };

  return (
    <>
      <ExpenseTableWrapper expense={expense} expenseRef={expenseRef}>
        <div className="overflow-x-auto">
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
                  <tr className="text-md border-b-2 border-gray-100" key={item.id}>
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
        </div>
      </ExpenseTableWrapper>
      <ExpenseUpdateModal modalRef={updateRef} id={expenseToUpdate} />
      <ExpenseModal modalRef={expenseRef} />
      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        totalItems={totalExpense}
        pageLimit={pageLimit}
      />
    </>
  );
}
