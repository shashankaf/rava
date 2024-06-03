"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AddBtn from "@/components/AddBtn";
import DashboardTitle from "@/components/DashboardTitle";
import LoadNumber from "@/components/LoadNumber";
import Search from "@/components/Search";
import { Share } from "@/lib/types";

export default function SharesTableWrapper({
  children,
  shares,
}: {
  children: React.ReactNode;
  shares: Share[];
}) {
  const [text, setText] = React.useState<string>("");
  const [, setFilteredShares] = React.useState<Share[]>([]);

  const handleSearch = (searchText: string) => {
    const filtered = shares.filter(
      (share) =>
        share?.teacher?.name
          ?.toLowerCase()
          .includes(searchText.toLowerCase()) ||
        share?.course?.title?.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredShares(filtered);
  };

  const router = useRouter();
  return (
    <div dir="rtl" className="text-black pt-20 xs:w-screen">
      <div className="flex flex-wrap justify-between items-center">
        <DashboardTitle text=" بەڕێوەبردنی پشکەکان" />
        <AddBtn handleAdd={() => router.push("/dashboard/shares/create")} />
        <div className="flex flex-wrap flex-row items-center justify-center gap-2">
          <Search text={text} setText={setText} handleSearch={handleSearch} />
          <LoadNumber />
        </div>
      </div>
      {children}
    </div>
  );
}
