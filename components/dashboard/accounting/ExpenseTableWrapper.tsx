//@ts-nocheck
"use client";

import React, { LegacyRef } from "react";
import AddBtn from "@/components/AddBtn";
import DashboardTitle from "@/components/DashboardTitle";
import LoadNumber from "@/components/LoadNumber";
import Search from "@/components/Search";
import { Expense } from "@/lib/types";

export default function ExpenseTableWrapper({
  children,
  expense,
  expenseRef,
}: {
  children: React.ReactNode;
  expense: Expense[];
  expenseRef: LegacyRef<HTMLInputElement>;
}) {
  const [text, setText] = React.useState<string>("");
  const [, setFilteredExpense] = React.useState<Expense[]>([]);

  const openExpenseModal = () => {
    if (expenseRef.current) {
      expenseRef.current.showModal();
    }
  };

  const handleSearch = (searchText: string) => {
    const filtered = expense.filter(
      (item) =>
        item?.student?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        item?.teacher?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        item?.course?.title?.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredExpense(filtered);
  };

  return (
    <div dir="rtl" className="text-black pt-20 xs:w-screen">
      <div className="flex flex-wrap justify-between items-center">
        <DashboardTitle text=" بەڕێوەبردنی خەرجی" />
        <AddBtn handleAdd={openExpenseModal} />
        <div className="flex flex-wrap flex-row items-center justify-center gap-2">
          <Search text={text} setText={setText} handleSearch={handleSearch} />
          <LoadNumber />
        </div>
      </div>
      {children}
    </div>
  );
}
