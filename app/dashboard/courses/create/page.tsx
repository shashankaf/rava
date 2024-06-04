"use client";

import { SyntheticEvent, useState } from "react";
import DatePickerComponent from "@/components/DatePickerComponent";
import SubmitButton from "@/components/SubmitBtn";
import GeneralWrapper from "@/components/dashboard/GeneralWrapper";
import { supabase } from "@/utils/supabase/client";
import Heading from "@/components/Heading";

export default function CreateCourse() {
  const [title, setTitle] = useState<string>("");
  const [start, setStart] = useState<Date>(new Date());
  const [end, setEnd] = useState<Date>(new Date());  

  const submitCourse = async (e: SyntheticEvent) => {
    e.preventDefault()
    const starting = start.toISOString()
    const ending = end.toISOString()
    try {
      const { error } = await supabase.from("course").insert({title, start: starting, end: ending});
      if (error) throw Error;
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <GeneralWrapper>
      <Heading text="زیادکردنی خولی نوێ" />
      <form
        onSubmit={submitCourse}
        className="form flex flex-col flex-wrap max-w-4xl gap-2 justify-center items-center"
      >
        <div className="flex flex-col items-center w-full">
        <label htmlFor="teacher" className="block text-lg font-medium text-gray-700">
          ناوی خول
        </label>
        <input
          type="text"
          name="title"
          className="input input-bordered w-full max-w-sm text-white bg-gray-800"
          placeholder="ناوی خول"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        </div>
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
        <SubmitButton />
      </form>
      </GeneralWrapper>
  );
}
