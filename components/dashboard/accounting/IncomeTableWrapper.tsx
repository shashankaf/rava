//@ts-nocheck
"use client";

import React, { LegacyRef } from "react";
import AddBtn from "@/components/AddBtn";
import DashboardTitle from "@/components/DashboardTitle";
import LoadNumber from "@/components/LoadNumber";
import Search from "@/components/Search";
import { Income } from "@/lib/types";

export default function IncomeTableWrapper({
  children,
  income,
  incomeRef
}: {
  children: React.ReactNode;
  income: Income[];
  incomeRef: LegacyRef<HTMLInputElement>
}) {
  const [text, setText] = React.useState<string>("");
  const [, setFilteredIncome] = React.useState<Income[]>([]);


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

  return (
    <div dir="rtl" className="text-black pt-20 xs:w-screen">
      <div className="flex flex-wrap justify-between items-center">
        <DashboardTitle text=" بەڕێوەبردنی داهات" />
        <AddBtn handleAdd={openIncomeModal} />
        <div className="flex flex-wrap flex-row items-center justify-center gap-2">
          <Search text={text} setText={setText} handleSearch={handleSearch} />
          <LoadNumber />
        </div>
      </div>
      {children}
    </div>
  );
}
