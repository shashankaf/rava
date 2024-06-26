"use client";

import { RefObject, SyntheticEvent, useEffect, useState } from "react";
import localFont from "next/font/local";
import { supabase } from "@/utils/supabase/client";
import InputState from "../InputState";
import { single_teacher_fetcher } from "@/lib/fetchers";
import { Teacher } from "@/lib/types";

const bbc = localFont({ src: "/../../app/sarkar_bbc.ttf" });

interface QuestionModalProps {
  modalRef: RefObject<HTMLDialogElement>;
  id: string | null;
}

export default function TeacherUpdateModal({
  modalRef,
  id,
}: QuestionModalProps) {
  const [, setTeacher] = useState<Teacher | null>(null);
  const [name, setName] = useState<string | null>("");
  const [specialty, setSpecialty] = useState<string | null>("");
  const [, setPhoto] = useState<string | null>("");

  useEffect(() => {
    const fetchTeacher = async () => {
      const data = await single_teacher_fetcher(id);
      if (data) {
        setTeacher(data);
        setName(data.name);
        setSpecialty(data.specialty);
      }
    };

    fetchTeacher();
  }, [id]);

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();
    if (id !== null) {
      try {
        const { error } = await supabase
          .from("teacher")
          .update({
            name,
            specialty,
          })
          .eq("id", id);
        if (error) {
          console.log(error);
        }
        setName("");
        setSpecialty("");
        setPhoto("");
        modalRef?.current?.close()
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <dialog ref={modalRef} className={`${bbc.className} modal text-white`}>
      <div className="modal-box">
        <h2 className="font-bold text-xl text-white">نوێکردنەوەی مامۆستا</h2>
        <form className="form flex flex-row flex-wrap max-w-4xl gap-2 justify-center" onSubmit={(e) => e.preventDefault()}>
          <InputState
            name="teacher"
            placeholder="ناوی مامۆستا"
            value={name ?? ""}
            setValue={setName}
          />
          <InputState
            name="specialty"
            placeholder="پسپۆڕیی مامۆستا"
            value={specialty ?? ""}
            setValue={setSpecialty}
          />

          <button
            onClick={handleUpdate}
            className="btn btn-error text-white mx-[2px] w-24"
          >
            بەڵێ
          </button>
          <button 
            className="btn btn-info text-white mx-[2px] w-24"
            onClick={() => (modalRef?.current as HTMLDialogElement).close()}
          >
            نەخێر
          </button>
        </form>
      </div>
    </dialog>
  );
}
