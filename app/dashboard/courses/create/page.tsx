"use client";

import DatePickerComponent from "@/components/DatePickerComponent";
import SubmitButton from "@/components/SubmitBtn";
import { supabase } from "@/utils/supabase/client";
import { SyntheticEvent, useState } from "react";

export default function CreateCourse() {
  const [title, setTitle] = useState<string>("");
  const [start, setStart] = useState<Date>(new Date());
  const [end, setEnd] = useState<Date>(new Date());  

  const submitCourse = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      const { error } = await supabase.from("course").insert({
        title,
        start,
        end,
      });
      if (error) throw Error;
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <div className="mt-24">
      <form
        onSubmit={submitCourse}
        className="form flex flex-row flex-wrap max-w-4xl gap-2 justify-center"
      >
        <input
          type="text"
          name="title"
          className="input input-bordered w-full max-w-sm"
          placeholder="ناوی خول"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <DatePickerComponent
          date={start}
          label="رۆژی دەستپێک"
          selectedDate={start}
          setSelectedDate={setStart}
        />
        <DatePickerComponent
          date={end}
          label="کۆتایی خول"
          selectedDate={end}
          setSelectedDate={setEnd}
        />
        <SubmitButton />
      </form>
    </div>
  );
}
