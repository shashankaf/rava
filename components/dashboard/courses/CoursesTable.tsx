"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import QuestionModal from "@/components/QuestionModal";
import Pagination from "@/components/Pagination";
import localFont from "next/font/local";
import { supabase } from "@/utils/supabase/client";
import { formatDate } from "@/lib/formatDate";
import { useAtom } from "jotai";
import { pageLimitAtom } from "@/lib/store";
import CourseUpdateModal from "@/components/modals/CourseUpdateModa";
import { Course } from "@/lib/types";
import CoursesTableWrapper from "./CoursesTableWrapper";

const bbc = localFont({ src: "/../../../app/sarkar_bbc.ttf" });

export default function CoursesTable() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [pageLimit] = useAtom(pageLimitAtom);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetcher = async (page: number, limit: number) => {
    try {
      const from = (page - 1) * limit;
      const to = page * limit - 1;
      const { data, error, count } = await supabase
        .from("course")
        .select(`*`, { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);
      if (error) throw Error;
      setCourses(data);
      setFilteredCourses(data);
      if (count !== null) {
        const calculatedTotalPages = Math.ceil(count / limit);
        if (calculatedTotalPages > 0 && currentPage <= calculatedTotalPages) {
          setTotalPages(calculatedTotalPages);
        } else {
          setCurrentPage(calculatedTotalPages > 0 ? calculatedTotalPages : 1);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetcher(currentPage, pageLimit);
  }, [pageLimit, currentPage]);

  const modalRef = useRef<HTMLDialogElement>(null);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);
  const updateRef = useRef<HTMLDialogElement>(null);

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

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
        fetcher(pageLimit, currentPage); // Refresh the data after deletion
      } catch (error: any) {
        console.error("Error deleting course:", error.message);
      }
    }
  };

  return (
    <>
      <CoursesTableWrapper courses={courses}>
        <div className="overflow-x-auto">
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
                <tr
                  key={course.id}
                  className="text-md border-b-2 border-gray-100"
                >
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
        </div>
      </CoursesTableWrapper>
      <CourseUpdateModal modalRef={updateRef} id={courseToUpdate} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
