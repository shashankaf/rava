"use client";

import { useRef, useState, useEffect } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";
import QuestionModal from "@/components/QuestionModal";
import Pagination from "@/components/Pagination";
import LoadNumber from "@/components/LoadNumber";
import Search from "@/components/Search";
import DashboardTitle from "@/components/DashboardTitle";
import localFont from "next/font/local";
import { supabase } from "@/utils/supabase/client";
import { useAtom } from "jotai";
import { pageLimitAtom } from "@/lib/store";
import { useRouter } from "next/navigation";
import AddBtn from "@/components/AddBtn";
import StudentUpdateModal from "@/components/modals/StudentUpdateModal";
import { Student } from "@/lib/types";

const bbc = localFont({ src: "/../../../app/sarkar_bbc.ttf" });

export default function StudentsTable() {
  const [students, setStudents] = useState<Student[]>([]);
  const [pageLimit] = useAtom(pageLimitAtom);

  const fetcher = async () => {
    try {
      const { data, error } = await supabase
        .from("student")
        .select(`*, class(*), blood(*), travel(*), ragaz(*), course(*)`)
        .order("created_at", { ascending: false })
        .limit(pageLimit);
      if (error) throw Error;
      setStudents(data);
      setFilteredStudents(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetcher();
  }, [pageLimit]);

  const modalRef = useRef<HTMLDialogElement>(null);
  const updateRef = useRef<HTMLDialogElement>(null)

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

const [studentToUpdate, setStudentToUpdate] = useState<string>("")
  const handleUpdate = (id: string) => {
    setStudentToUpdate(id)
    if(updateRef.current) {
      updateRef.current.showModal()
    }
  }


  const [text, setText] = useState("");
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);

  const handleSearch = (searchText: string) => {
    const filtered = students.filter(
      (student) =>
        student.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        student.address?.toLowerCase().includes(searchText.toLowerCase()) ||
        student.school?.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredStudents(filtered);
  };

  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async (id:string) => {
    try {
      const { error } = await supabase.from("student").delete().eq("id", id);

      if (error) {
        throw error;
      }
      setIsDeleted(true); // Set state to indicate deletion is done
    } catch (error: any) {
      console.error("Error deleting student:", error.message);
    }
  };

  useEffect(() => {
    if (isDeleted) {
      setIsDeleted(false); // Reset state
      window.location.reload(); // Refresh the page
    }
  }, [isDeleted]);

  const router = useRouter()

  return (
    <div dir="rtl" className="text-black pt-20 overflow-x-hidden">
      <div className="flex flex-wrap justify-between items-center">
        <DashboardTitle text=" بەڕێوەبردنی خوێندکاران" />
        <AddBtn handleAdd={() => router.push("../form")} />
        <div className="flex flex-wrap flex-row items-center justify-center gap-2">
          <Search text={text} setText={setText} handleSearch={handleSearch} />
          <LoadNumber />
        </div>
      </div>
      <table dir="rtl" className={`${bbc.className} overflow-x-scroll table w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400`}>
        <thead className="text-black text-md bg-gray-100">
          <tr>
            <th>ناو</th>
            <th>پۆل</th>
            <th>خوێن</th>
            <th>هاتووچۆ</th>
            <th>رەگەز</th>
            <th className="text-center">دەستکاریی</th>
          </tr>
        </thead>
        <tbody className="text-md border-b-2 border-gray-100">
          {filteredStudents.map((student) => {
            return (
              <tr className="text-md border-b-2 border-gray-100">
                <td>{student?.name}</td>
                <td>{student?.class?.title}</td>
                <td>{student?.blood?.title}</td>
                <td>{student?.travel?.title}</td>
                <td>{student?.ragaz?.title}</td>
                <td className="flex gap-x-6 justify-center text-2xl">
                  <div
                    className="tooltip tooltip-warning text-green-500 cursor-pointer hover:text-green-900 transition-all duration-400"
                    data-tip="خوێندنەوە"
                    onClick={() => router.push(`/dashboard/students/read/${student.id}`)}
                  >
                    <FaBookOpenReader />
                  </div>
                  <div
                    className="tooltip tooltip-warning text-indigo-500 cursor-pointer hover:text-indigo-900 transition-all duration-400"
                    data-tip="نوێکردنەوە"
                    onClick={() => handleUpdate(student.id)}
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
                    text="خوێندکار"
                    modalRef={modalRef}
                    handleClick={() => handleDelete(student.id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <StudentUpdateModal modalRef={updateRef} id={studentToUpdate} />
      <Pagination />
    </div>
  );
}
