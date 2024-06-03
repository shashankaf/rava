"use client"
import React from "react"
import { useRouter } from "next/navigation";
import AddBtn from "@/components/AddBtn";
import DashboardTitle from "@/components/DashboardTitle";
import LoadNumber from "@/components/LoadNumber";
import Search from "@/components/Search";
import { Student } from "@/lib/types";

export default function StudentTableWrapper({children, students}:{children:React.ReactNode, students:Student[]}) {
  const [text, setText] = React.useState<string>("")
  const [, setFilteredStudents] = React.useState<Student[]>([]);

  const handleSearch = (searchText: string) => {
    const filtered = students.filter(
      (student) =>
        student.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        student.address?.toLowerCase().includes(searchText.toLowerCase()) ||
        student.school?.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredStudents(filtered);
  };


  const router = useRouter()
  return (
    <div dir="rtl" className="text-black pt-20 xs:w-screen">
      <div className="flex flex-wrap justify-between items-center">
        <DashboardTitle text=" بەڕێوەبردنی خوێندکاران" />
        <AddBtn handleAdd={() => router.push("../form")} />
        <div className="flex flex-wrap flex-row items-center justify-center gap-2">
          <Search text={text} setText={setText} handleSearch={handleSearch} />
          <LoadNumber />
        </div>
      </div>
      {children}
      </div>
  )
}
