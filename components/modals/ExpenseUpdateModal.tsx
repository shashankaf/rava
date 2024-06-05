"use client";

import { LegacyRef, useEffect, useState } from "react";
import localFont from "next/font/local";
import {
  course_fetcher,
  single_expense_fecther,
  student_fetcher,
  teacher_fetcher,
} from "@/lib/fetchers";
import { supabase } from "@/utils/supabase/client";
import { Course, StudentRaw, Teacher } from "@/lib/types";
import Label from "../form/Label";

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
  const [students, setStudents] = useState<StudentRaw[]>([]);
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
    const fetchTeacher = async () => {
      const data = await single_expense_fecther(id);
      if (data && data.student && data.course && data.teacher) {
        setAmount(data.amount);
        setStudent(data.student.id);
        setCourse(data.course.id);
        setTeacher(data.teacher.id);
      }
    };

    fetchTeacher();
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
      setTeacher([]);
      setAmount(0);
      setStudent(null);
    }
  }

  return (
    <dialog ref={modalRef} className={`${bbc.className} modal`}>
      <div className="modal-box">
        <h2 className="font-bold text-xl text-white">نوێکردنەوەی داهات</h2>
        <div className="modal-action">
          <form method="dialog flex flex-row flex-wrap justify-center">
            <div className="my-4">
              <Label>بڕ</Label>
              <input
                type="text"
                name="name"
                value={amount ?? 0}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="input input-bordered w-full text-white"
                placeholder={"بڕی داهات"}
              />
            </div>
            <div className="my-4">
              <Label>مامۆستا</Label>
              <select
                name="teacher"
                className="select input-bordered text-white w-full"
                value={teacher || ""}
                onChange={(e) => setTeacher(e.target.value)}
              >
                {teachers.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="my-4">
              <Label>خول</Label>
              <select
                name="course"
                className="select input-bordered text-white w-full"
                value={course || ""}
                onChange={(e) => setCourse(e.target.value)}
              >
                {courses.map((item) => (
                  <option value={item.id}>{item.title}</option>
                ))}
              </select>
            </div>
            <div className="my-4">
              <Label>خوێندکار</Label>
              <select
                name="student"
                className="select input-bordered text-white w-full"
                value={student || ""}
                onChange={(e) => setStudent(e.target.value)}
              >
                {students.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
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
