"use client";

import { useRef, useState, useEffect, MouseEvent } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";
import QuestionModal from "@/components/QuestionModal";
import Pagination from "@/components/Pagination";
import localFont from "next/font/local";
import { supabase } from "@/utils/supabase/client";
import { useAtom } from "jotai";
import { pageLimitAtom } from "@/lib/store";
import { useRouter } from "next/navigation";
import StudentUpdateModal from "@/components/modals/StudentUpdateModal";
import { Student } from "@/lib/types";
import StudentTableWrapper from "./StudentTableWrapper";

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
      setFilteredStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetcher();
  }, [pageLimit]);

  const modalRef = useRef<HTMLDialogElement>(null);
  const updateRef = useRef<HTMLDialogElement>(null);
  
  const [studentToUpdate, setStudentToUpdate] = useState<string | null>("");
  const handleUpdate = (id: string) => {
    setStudentToUpdate(id);
    if (updateRef.current) {
      updateRef.current.showModal();
    }
  };
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null)
  const openModal = (id: string) => {
    setStudentToDelete(id);
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (studentToDelete) {
      try {
        const { error } = await supabase
          .from("student")
          .delete()
          .eq("id", studentToDelete);

        if (error) {
          console.log(error);
        }
        setStudentToDelete(null);
        fetcher(); 
      } catch (error: any) {
        console.error("Error deleting student:", error.message);
      }
    }
  };

  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);

  const router = useRouter();

  return (
    <StudentTableWrapper students={students}>
      <div className="overflow-x-auto">
      <table
        dir="rtl"
        className={`${bbc.className} table text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400`}
      >
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
          {filteredStudents.map((item) => {
            return (
              <tr key={item.id} className="text-md border-b-2 border-gray-100">
                <td>{item.name}</td>
                <td>{item.class?.title}</td>
                <td>{item.blood?.title}</td>
                <td>{item.travel?.title}</td>
                <td>{item.ragaz?.title}</td>
                <td className="flex gap-x-6 justify-center text-2xl">
                  <div
                    className="tooltip tooltip-warning text-green-500 cursor-pointer hover:text-green-900 transition-all duration-400"
                    data-tip="خوێندنەوە"
                    onClick={() =>
                      router.push(`/dashboard/students/read/${item.id}`)
                    }
                  >
                    <FaBookOpenReader />
                  </div>
                  <div
                    className="tooltip tooltip-warning text-indigo-500 cursor-pointer hover:text-indigo-900 transition-all duration-400"
                    data-tip="نوێکردنەوە"
                    onClick={() => handleUpdate(item.id)}
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
                    text="خوێندکار"
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
      <StudentUpdateModal modalRef={updateRef} id={studentToUpdate} />
      <Pagination />
    </StudentTableWrapper>
  );
}
