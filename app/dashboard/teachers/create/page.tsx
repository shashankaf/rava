//@ts-nocheck
"use client";

import SubmitButton from "@/components/SubmitBtn";
import { createTeacher } from "@/lib/form_functions";
import { useState } from "react";
import { useFormState } from "react-dom";

export default function CreateTeacher() {
  const [state, setState] = useState({
    name: "",
    specialty: "",
    photo: null,
    bio: "",
    order: ""
  });
  const [value, formAction] = useFormState(createTeacher, state);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setState((prevState) => ({
        ...prevState,
        photo: e.target.files[0]
      }));
    }
  };

  return (
    <div className="mt-24">
      <form
        action={formAction}
        className="form flex flex-row flex-wrap max-w-4xl gap-2 justify-center"
      >
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          className="input input-bordered w-full max-w-sm"
          placeholder="ناوی مامۆستا"
        />
        <input
          type="text"
          name="specialty"
          value={state.specialty}
          onChange={handleChange}
          className="input input-bordered w-full max-w-sm"
          placeholder="پسپۆڕیی مامۆستا"
        />
        <textarea
          name="bio"
          value={state.bio}
          onChange={handleChange}
          className="input input-bordered w-full max-w-sm"
          placeholder="ژیاننماەی مامۆستا"
        />
        <input
          type="text"
          name="order"
          value={state.order}
          onChange={handleChange}
          className="input input-bordered w-full max-w-sm"
          placeholder="ریزبنەدیی مامۆستا"
        />
        <input
          type="file"
          name="photo"
          accept="image/png, image/jpeg, image/jpg, image/webp"
          onChange={handleFileChange}
          className="file-input file-input-bordered w-full max-w-sm"
        />
        <SubmitButton />
      </form>
    </div>
  );
}
