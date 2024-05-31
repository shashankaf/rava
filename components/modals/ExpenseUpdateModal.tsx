"use client";

import { LegacyRef, useEffect, useState } from "react";
import localFont from "next/font/local";
import {
  course_fetcher,
  single_expense_fecther,
  student_fetcher,
  teacher_fetcher,
} from "@/lib/fetchers";
import SelectName from "../SelectName";
import SelectTitle from "../SelectTitle";
import { supabase } from "@/utils/supabase/client";
import { Course, Student, Teacher } from "@/lib/types";

const bbc = localFont({ src: "/../../app/sarkar_bbc.ttf" });

interface QuestionModalProps {
  modalRef: LegacyRef<HTMLDialogElement>;
  id: string | null;
}

export default function ExpenseUpdateModal({
  modalRef,
  id,
}: QuestionModalProps) {
  const [amount, setAmount] = useState<number | null>(0);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [teacher, setTeacher] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [course, setCourse] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [student, setStudent] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      const data = await teacher_fetcher();
      if (data) {
        setTeachers(data);
      }
    };

    fetchTeachers();
  }, []);

  useEffect(() => {
    const fetchExpense = async () => {
      const data = await single_expense_fecther(id);
      if (data && data.student && data.course) {
        const num = Number(data.amount)
        setAmount(num);
        setStudent(data.student.id);
        setCourse(data.course.id);
        setTeacher(data.teacher);
      }
    };

    fetchExpense();
  }, [id]);

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await course_fetcher();
      if (data) {
        setCourses(data);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      const data = await student_fetcher();
      if (data) {
        setStudents(data);
      }
    };

    fetchStudents();
  }, []);

  function changeTeacher(value: string) {
    setTeacher(value);
  }

  function changeCourse(value: string) {
    setCourse(value);
  }
  function changeStudent(value: string) {
    setStudent(value);
  }

  async function handleExpense() {
    if (id !== null) {
      const { error } = await supabase
        .from("expense")
        .update({
          amount,
          teacher,
          student,
          course,
        })
        .eq("id", id);
      if (error) {
        console.log(error);
      }
      setCourse(null);
      setTeacher(null);
      setAmount(0);
      setStudent(null);
    }
  }

  return (
    <dialog ref={modalRef} className={`${bbc.className} modal`}>
      <div className="modal-box">
        <h2 className="font-bold text-xl text-white">نوێکردنەوەی داهات</h2>
        <div className="modal-action">
          <form method="dialog form flex flex-row flex-wrap max-w-4xl gap-2 justify-center">
            <input
              type="number"
              name="name"
              value={amount ?? 0}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="input input-bordered w-full m-2 text-white"
              placeholder={"بڕی داهات"}
            />
            <SelectName
              options={teachers}
              text="مامۆستای پەیوەندیدار"
              onSelectChange={changeTeacher}
            />
            <SelectTitle
              text="خولی پەیوەندیدار"
              options={courses}
              onSelectChange={changeCourse}
            />
            <SelectName
              options={students}
              text="مامۆستای پەیوەندیدار"
              onSelectChange={changeStudent}
            />
            <button
              onClick={handleExpense}
              className="btn btn-error text-white mx-[2px] w-24"
            >
              بەڵێ
            </button>
            <button className="btn btn-info text-white mx-[2px] w-24">
              نەخێر
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
