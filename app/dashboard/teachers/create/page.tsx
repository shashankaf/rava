//@ts-nocheck
"use client";

import SubmitButton from "@/components/SubmitBtn";
import GeneralWrapper from "@/components/dashboard/GeneralWrapper";
import { createTeacher } from "@/lib/form_functions";
import { useState } from "react";
import { useFormState } from "react-dom";
import Heading from "@/components/Heading";

export default function CreateTeacher() {
  const [state, setState] = useState({
    name: "",
    specialty: "",
    photo: null,
    bio: "",
    order: "",
  });
  const [, formAction] = useFormState(createTeacher, state);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setState((prevState) => ({
        ...prevState,
        photo: e.target.files[0],
      }));
    }
  };

  return (
    <GeneralWrapper>
      <Heading text="زیادکردنی مامۆستا" />
      <form
        action={formAction}
        className="form flex flex-row flex-wrap max-w-4xl gap-2 justify-center mx-auto"
      >
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          className="input input-bordered w-full max-w-sm text-white bg-gray-800"
          placeholder="ناوی مامۆستا"
        />
        <input
          type="text"
          name="specialty"
          value={state.specialty}
          onChange={handleChange}
          className="input input-bordered w-full max-w-sm text-white bg-gray-800"
          placeholder="پسپۆڕیی مامۆستا"
        />
        <textarea
          name="bio"
          value={state.bio}
          onChange={handleChange}
          className="input input-bordered w-full max-w-sm text-white bg-gray-800 p-2"
          placeholder="ژیاننامەی مامۆستا"
        />
        <input
          type="text"
          name="order"
          value={state.order}
          onChange={handleChange}
          className="input input-bordered w-full max-w-sm text-white bg-gray-800 p-4"
          placeholder="ریزبەندیی مامۆستا"
        />
        <input
          type="file"
          name="photo"
          accept="image/png, image/jpeg, image/jpg, image/webp"
          onChange={handleFileChange}
          title="وێنەیەک هەڵبژێرە"
          className="file-input file-input-bordered w-full max-w-sm"
        />
        <SubmitButton />
      </form>
    </GeneralWrapper>
  );
}
