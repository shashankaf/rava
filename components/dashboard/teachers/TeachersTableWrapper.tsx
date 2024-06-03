"use client";
import React from "react";
import { useRouter } from "next/navigation";
import AddBtn from "@/components/AddBtn";
import DashboardTitle from "@/components/DashboardTitle";
import LoadNumber from "@/components/LoadNumber";
import Search from "@/components/Search";
import { Teacher } from "@/lib/types";

export default function TeachersTableWrapper({
  children,
  teachers,
}: {
  children: React.ReactNode;
  teachers: Teacher[];
}) {

  const [text, setText] = React.useState("");
  const [, setFilteredTeachers] = React.useState<Teacher[]>([]);

  const handleSearch = (searchText: string) => {
    const filtered = teachers.filter(
      (teacher) =>
        teacher?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        teacher?.specialty?.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredTeachers(filtered);
  };  
  const router = useRouter();
  return (
    <div dir="rtl" className="text-black pt-20 xs:w-screen">
      <div className="flex flex-wrap justify-between items-center">
        <DashboardTitle text=" بەڕێوەبردنی مامۆستایان" />
        <AddBtn handleAdd={() => router.push("/dashboard/teachers/create")} />
        <div className="flex flex-wrap flex-row items-center justify-center gap-2">
          <Search text={text} setText={setText} handleSearch={handleSearch} />
          <LoadNumber />
        </div>
      </div>
      {children}
    </div>
  );
}
