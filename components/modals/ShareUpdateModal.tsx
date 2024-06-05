//@ts-nocheck
"use client";

import { ChangeEvent, LegacyRef, useEffect, useState } from "react";
import localFont from "next/font/local";
import { course_fetcher, single_share_fetcher, teacher_fetcher } from "@/lib/fetchers";
import { supabase } from "@/utils/supabase/client";
import {Teacher, Course} from "@/lib/types";
const bbc = localFont({ src: "/../../app/sarkar_bbc.ttf" });

interface QuestionModalProps {
  modalRef: LegacyRef<HTMLDialogElement>;
  id: string | null;
}

export default function ShareUpdateModal({ modalRef, id }: QuestionModalProps) {
  const [teacher, setTeacher] = useState<string | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [course, setCourse] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [percent, setPercent] = useState<number | null>(0);
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
    const fetchCourses = async () => {
      const data = await course_fetcher();
      if (data) {
        setCourses(data);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchShare = async () => {
      const data = await single_share_fetcher(id);
      if (data) {
        setTeacher(data.teacher.id);
        setCourse(data.course.id);
        setPercent(data.percentage)
      }
    };

    fetchShare();
  }, [id]);

  const handleTeacherChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTeacher(e.target.value);
  };

  const handleCourseChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCourse(e.target.value);
  };

  const handlePercentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPercent(Number(e.target.value));
  };

  async function handleUpdate() {
    if (id !== null) {
      try {
      const { error } = await supabase
        .from("share")
        .update({
          percentage: percent,
          teacher,
          course,
        })
        .eq("id", id);
      if (error) {
        console.log(error);
      }
      setCourse(null);
      setTeacher(null);
      setPercent(0)
      } catch(e) {
        console.log(e)
      }
    }
  }

  return (
    <dialog ref={modalRef} className={`${bbc.className} modal text-white`}>
      <div className="modal-box">
        <h2 className="font-bold text-xl text-white">نوێکردنەوەی پشک</h2>
        <form className="form flex flex-row flex-wrap max-w-4xl gap-2 justify-center">
          <label
            htmlFor="teacher"
            className="block text-lg font-medium"
          >
            مامۆستایەک هەڵبژێرە
          </label>
          <select
            name="teacher"
            id="teacher"
            className="select select-bordered w-full mt-2"
            value={teacher ?? ""}
            onChange={handleTeacherChange}
          >
            {teachers?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <label
            htmlFor="course"
            className="block text-lg font-medium"
          >
            خولێک هەڵبژێرە
          </label>
          <select
            name="course"
            id="course"
            className="select select-bordered w-full mt-2"
            value={course ?? ""}
            onChange={handleCourseChange}
          >
            {courses?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
          <label
            htmlFor="course"
            className="block text-lg font-medium"
          >رێژەی سەددی پشکی مامۆستا</label> 
          <input
            type="number"
            name="percentage"
            className="input input-bordered w-full mt-2"
            placeholder="پشکی مامۆستا چەندە"
            value={percent}
            onChange={handlePercentChange}
          />
          <button
            onClick={handleUpdate}
            className="btn btn-error text-white mx-[2px] w-24"
          >
            بەڵێ
          </button>
          <button className="btn btn-info text-white mx-[2px] w-24">
            نەخێر
          </button>
        </form>
      </div>
    </dialog>
  );
}
