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
import { supabase } from "@/utils/supabase/client";
import { formatDate } from "@/lib/formatDate";
import { useAtom } from "jotai";
import { pageLimitAtom } from "@/lib/store";
import AddBtn from "@/components/AddBtn";
import { useRouter } from "next/navigation";
import CourseUpdateModal from "@/components/modals/CourseUpdateModa";
import { Course } from "@/lib/types";

const bbc = localFont({ src: "/../../../app/sarkar_bbc.ttf" });

export default function CoursesTable() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [text, setText] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [pageLimit] = useAtom(pageLimitAtom);

  const handleSearch = (searchText: string) => {
    const filtered = courses.filter((course) =>
      course.title?.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredCourses(filtered);
  };

  const fetcher = async () => {
    try {
      const { data, error } = await supabase
        .from("course")
        .select()
        .order("created_at", { ascending: false });
      if (error) throw Error;
      setCourses(data);
      setFilteredCourses(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetcher();
  }, [pageLimit]);

  const modalRef = useRef<HTMLDialogElement>(null);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);
  const updateRef = useRef(null);

  const [courseToUpdate, setCourseToUpdate] = useState<string | null>(null);

  const handleUpdate = (id: string) => {
    setCourseToUpdate(id);
    if (updateRef.current) {
      updateRef.current.showModal();
    }
  };

  const openModal = (id: string) => {
    setCourseToDelete(id);
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const handleDelete = async () => {
    if (courseToDelete) {
      try {
        const { error } = await supabase
          .from("course")
          .delete()
          .eq("id", courseToDelete);

        if (error) {
          console.log(error);
        }
        setCourseToDelete(null);
        fetcher(); // Refresh the data after deletion
      } catch (error: any) {
        console.error("Error deleting course:", error.message);
      }
    }
  };

  return (
    <div dir="rtl" className="w-full mt-24 text-black ">
      <div className="flex flex-wrap justify-between">
        <DashboardTitle text=" بەڕێوەبردنی خولەکان" />
        <AddBtn handleAdd={() => router.push("/dashboard/courses/create")} />
        <div className="flex flex-wrap flex-row items-center justify-center gap-2">
          <Search text={text} setText={setText} handleSearch={handleSearch} />
          <LoadNumber />
        </div>
      </div>
      <table dir="rtl" className={`${bbc.className} table`}>
        <thead className="text-black text-md bg-gray-100">
          <tr>
            <th>ناو</th>
            <th>دەستپێک</th>
            <th>کۆتایی</th>
            <th className="text-center">دەستکاریی</th>
          </tr>
        </thead>
        <tbody className="text-md border-b-2 border-gray-100">
          {filteredCourses.map((course) => (
            <tr key={course.id} className="text-md border-b-2 border-gray-100">
              <td>{course.title}</td>
              <td>{formatDate(course.start)}</td>
              <td>{formatDate(course.end)}</td>
              <td className="flex gap-x-6 justify-center text-2xl">
                <div
                  className="tooltip tooltip-warning text-indigo-500 cursor-pointer hover:text-indigo-900 transition-all duration-400"
                  data-tip="نوێکردنەوە"
                  onClick={() => handleUpdate(course.id)}
                >
                  <FaEdit />
                </div>
                <div
                  className="tooltip tooltip-warning text-red-500 cursor-pointer hover:text-red-900 transition-all duration-400"
                  data-tip="سڕینەوە"
                  onClick={() => openModal(course.id)}
                >
                  <RiDeleteBin5Fill />
                </div>
                <QuestionModal
                  text="خول"
                  modalRef={modalRef}
                  handleClick={handleDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CourseUpdateModal modalRef={updateRef} id={courseToUpdate}  />
      <Pagination />
    </div>
  );
}
