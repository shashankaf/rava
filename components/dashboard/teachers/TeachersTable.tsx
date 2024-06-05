"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";
import QuestionModal from "@/components/QuestionModal";
import Pagination from "@/components/Pagination";
import localFont from "next/font/local";
import { supabase } from "@/utils/supabase/client";
import { pageLimitAtom } from "@/lib/store";
import { useAtom } from "jotai";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TeacherUpdateModal from "@/components/modals/TeacherUpdateModal";
import { Teacher } from "@/lib/types";
import TeachersTableWrapper from "./TeachersTableWrapper";

const bbc = localFont({ src: "/../../../app/sarkar_bbc.ttf" });

interface ModalElement extends HTMLDialogElement {
  showModal: () => void;
}

export default function TeachersTable() {
  const [pageLimit] = useAtom(pageLimitAtom);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const fetcher = async () => {
    try {
      const { error, data } = await supabase
        .from("teacher")
        .select()
        .limit(pageLimit)
        .order("created_at", { ascending: false });
      if (error) {
        throw Error;
      }
      setTeachers(data);
      setFilteredTeachers(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetcher();
  }, [pageLimit]);

  const modalRef = useRef<ModalElement>(null);
  const updateRef = useRef<ModalElement>(null);

  const openModal = (id: string) => {
    setTeacherToDelete(id);
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const router = useRouter();
  const [teacherToUpdate, setTeacherToUpdate] = useState(null);

  const handleUpdate = (id: any) => {
    setTeacherToUpdate(id);
    if (updateRef.current) {
      updateRef.current.showModal();
    }
  };

  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [teacherToDelete, setTeacherToDelete] = useState<string | null>(null);

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (teacherToDelete) {
      try {
        const { error } = await supabase
          .from("teacher")
          .delete()
          .eq("id", teacherToDelete);

        if (error) {
          console.log(error);
        }
        setTeacherToDelete(null);
        fetcher();
      } catch (error: any) {
        console.error("Error deleting teacher:", error.message);
      }
    }
  };

  return (
    <>
      <TeachersTableWrapper teachers={teachers}>
      <div className="overflow-x-auto">
        <table dir="rtl" className={`${bbc.className} table text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400`}>
          <thead className="text-black text-md bg-gray-100">
            <tr>
              <th>ناو</th>
              <th>پسپۆڕیی</th>
              <th>وێنە</th>
              <th className="text-center">دەستکاریی</th>
            </tr>
          </thead>
          <tbody className="text-md border-b-2 border-gray-100">
            {filteredTeachers.map((teacher) => (
              <tr
                key={teacher.id}
                className="text-md border-b-2 border-gray-100"
              >
                <td>{teacher.name}</td>
                <td>{teacher.specialty}</td>
                <td>
                  <Image
                    src={teacher.photo ?? ""}
                    alt={teacher.name ?? ""}
                    height={100}
                    width={100}
                    className="rounded-full border-2 border-indigo-600 w-10 h-10 object-cover"
                  />
                </td>
                <td className="flex gap-x-6 justify-center text-2xl">
                  <div
                    className="tooltip tooltip-warning text-green-500 cursor-pointer hover:text-green-900 transition-all duration-400"
                    data-tip="خوێندنەوە"
                    onClick={() =>
                      router.push(`/dashboard/teachers/read/${teacher.id}`)
                    }
                  >
                    <FaBookOpenReader />
                  </div>
                  <div
                    className="tooltip tooltip-warning text-indigo-500 cursor-pointer hover:text-indigo-900 transition-all duration-400"
                    data-tip="نوێکردنەوە"
                    onClick={() => handleUpdate(teacher.id)}
                  >
                    <FaEdit />
                  </div>
                  <div
                    className="tooltip tooltip-warning text-red-500 cursor-pointer hover:text-red-900 transition-all duration-400"
                    data-tip="سڕینەوە"
                    onClick={() => openModal(teacher.id)}
                  >
                    <RiDeleteBin5Fill />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </TeachersTableWrapper>
      <TeacherUpdateModal modalRef={updateRef} id={teacherToUpdate} />
      <QuestionModal
        text="مامۆستا"
        modalRef={modalRef}
        handleClick={handleDelete}
      />
      <Pagination />
    </>
  );
}
