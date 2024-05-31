//@ts-nocheck
"use client";

import SubmitButton from "@/components/SubmitBtn";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { teacher_fetcher, course_fetcher } from "@/lib/fetchers";
import { supabase } from "@/utils/supabase/client";

interface Teacher {
  id: string;
  name: string;
}

interface Course {
  id: string;
  title: string;
}

export default function CreateShare() {
  const [teacher, setTeacher] = useState<string | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [course, setCourse] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [percent, setPercent] = useState<number>(0);

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

  const handleTeacherChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTeacher(e.target.value);
  };

  const handleCourseChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCourse(e.target.value);
  };

  const handlePercentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPercent(Number(e.target.value));
  };

  const handleShareSubmit = async() => {
    const {error, data} = await supabase.from("share").insert({
      teacher,
      course,
      percentage: percent
    })
    if(error) {
      console.log(error)
    }
  }

  return (
    <div className="mt-24">
      <form
        onSubmit={handleShareSubmit}
        className="form flex flex-row flex-wrap max-w-4xl gap-2 justify-center"
      >
        <label htmlFor="teacher" className="block text-lg font-medium text-gray-700">
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

        <label htmlFor="course" className="block text-lg font-medium text-gray-700">
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

        <input
          type="number"
          name="percentage"
          className="input input-bordered w-full max-w-sm mt-2"
          placeholder="پشکی مامۆستا چەندە"
          value={percent}
          onChange={handlePercentChange}
        />
        <SubmitButton />
      </form>
    </div>
  );
}
