"use client";

import { LegacyRef, useEffect, useState } from "react";
import localFont from "next/font/local";
import { single_course_fetcher } from "@/lib/fetchers";
import { supabase } from "@/utils/supabase/client";
import DatePickerComponent from "../DatePickerComponent";
import { SyntheticEvent } from "react";
import { Course } from "@/lib/types";
const bbc = localFont({ src: "/../../app/sarkar_bbc.ttf" });

interface QuestionModalProps {
  modalRef: LegacyRef<HTMLDialogElement>;
  id: string | null;
}

export default function CourseUpdateModal({
  modalRef,
  id,
}: QuestionModalProps) {
  const [, setCourse] = useState<Course | null>(null);
  const [title, setTitle] = useState<string | null>("");
  const [start, setStart] = useState<Date>(new Date());
  const [end, setEnd] = useState<Date>(new Date());

  useEffect(() => {
    const fetchCourse = async () => {
      const data = await single_course_fetcher(id);
      if (data) {
        setCourse(data);
        setTitle(data.title);
        setStart(start);
        setEnd(end);
      }
    };

    fetchCourse();
  }, [id]);

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();
    const starting = start?.toISOString()
    const ending = end?.toISOString()
    if (id !== null) {
      try {
        const { error } = await supabase
          .from("course")
          .update({
            title,
            start: starting,
            end: ending,
          })
          .eq("id", id);
        if (error) {
          console.log(error);
        }
        setCourse(null);
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <dialog ref={modalRef} className={`${bbc.className} modal text-white`}>
      <div className="modal-box">
        <h2 className="font-bold text-xl text-white">نوێکردنەوەی پشک</h2>
        <form className="form flex flex-row flex-wrap max-w-4xl gap-2 justify-center">
          <label htmlFor="course" className="block text-lg font-medium">
            خولێک هەڵبژێرە
          </label>
          <input
            type="text"
            name="title"
            value={title ?? ""}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full m-2"
            placeholder={"ناونیشان"}
          />
          <DatePickerComponent
            label="رۆژی دەستپێک"
            selectedDate={start}
            setSelectedDate={setStart}
          />
          <DatePickerComponent
            label="کۆتایی خول"
            selectedDate={end}
            setSelectedDate={setEnd}
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
