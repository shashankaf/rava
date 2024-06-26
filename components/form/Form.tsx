"use client";

import React, { useState } from "react";
import Heading from "../Heading";
import Input from "./Input";
import Select from "./Select";
import { useAtom } from "jotai";
import {
  addressAtom,
  healthAtom,
  nameAtom,
  phoneAtom,
  schoolAtom,
  secondPhoneAtom,
  teacherAtom,
} from "../../lib/store";
import AllTeachers from "./AllTeachers";
import { supabase } from "@/utils/supabase/client";

import localFont from "next/font/local";
import MessageModal from "./MessageModal";

const rudaw = localFont({ src: "/../../app/rudaw.ttf" });

interface GeneralType {
  id: string;
  title: string;
}

interface DataType {
  ragazakan: GeneralType[];
  bloods: GeneralType[];
  classes: GeneralType[];
  travels: GeneralType[];
  courses: GeneralType[];
}

export default function Form({ ragazakan, classes, bloods, travels, courses }: DataType) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useAtom<string>(nameAtom);
  const [school, setSchool] = useAtom<string | null>(schoolAtom);
  const [phone, setPhone] = useAtom<string | null>(phoneAtom);
  const [secondPhone, setSecondPhone] = useAtom<string | null>(secondPhoneAtom);
  const [address, setAddress] = useAtom<string | null>(addressAtom);
  const [health, setHealth] = useAtom<string | null>(healthAtom);

  const [teacher] = useAtom(teacherAtom);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<boolean>(false);

  const handleError = (errorMessage: string) => {
    setErrors((prev) => [...prev, errorMessage]);
  };

  const [selectedRagaz, setSelectedRagaz] = useState<number | null | undefined>(
    null,
  );
  const [selectedClas, setSelectedClas] = useState<number | null | undefined>(
    null,
  );
  const [selectedBlood, setSelectedBlood] = useState<number | null | undefined>(
    null,
  );
  const [selectedTravel, setSelectedTravel] = useState<
    number | null | undefined
  >(null);
  const [selectedCourse, setSelectedCourse] = useState<string>("");

  const handleRagazChange = (value: string) => {
    const numRagaz = Number(value);
    setSelectedRagaz(numRagaz);
  };
  const handleClasChange = (value: string) => {
    const numClas = Number(value);
    setSelectedClas(numClas);
  };
  const handleBloodChange = (value: string) => {
    const numBlood = Number(value);
    setSelectedBlood(numBlood);
  };
  const handleTravelChange = (value: string) => {
    const numTravel = Number(value);
    setSelectedTravel(numTravel);
  };
  const handleCourseChange = (value: string) => {
    setSelectedCourse(value);
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    if (name.length < 2) {
      const msg = "تکایە ناوێکی گونجاو هەڵبژێرە";
      handleError(msg);
    }
    if (selectedClas === null) {
      const msg = "تکایە دیاریبکە لە چ پۆلێکیت";
      handleError(msg);
    }
    if (selectedCourse === null) {
      const msg = "تکایە خولێک هەڵبژێرە";
      handleError(msg);
    }
    if (teacher.length === 0) {
      const msg = "تکایە مامۆستایەک یان زیاتر هەڵبژێرە";
      handleError(msg);
    }
    // Assuming errors is an array
    if (errors.length > 0) {
      setLoading(false);
      return;
    }

    // Prepare the info object
    const info = {
      name,
      class: selectedClas,
      school,
      blood: selectedBlood,
      phone,
      second_phone: secondPhone,
      course: selectedCourse,
      address,
      travel: selectedTravel,
      health,
      ragaz: selectedRagaz,
      teacher,
    };

    // Insert the data
    const { error, data } = await supabase
      .from("student")
      .insert(info)
      .select()
      .single();

    if (error) {
      setLoading(false);
      console.log(error);
      return;
    }
    if (data) {
      setLoading(false);
      setSuccess(true)
      const msg = `سوپاس بۆ خۆتۆمارکردنت ${data.name}`;
      handleError(msg);
      return;
    }
  };

  return (
    <div
      dir="rtl"
      className="relative bg-transparent rounded-xl shadow-md shadow-gray-400 backdrop-blur-xs bg-white/30"
    >
      <Heading text="فۆرمی خۆتۆمارکردن" />
      <div className="flex  flex-wrap gap-2 justify-center pb-8">
        <Input
          state={name ?? ""}
          setState={setName}
          placeholder="ناوی سیانییت چیە؟"
          label="ناو:"
        />
        <Input
          state={school ?? ""}
          setState={setSchool}
          placeholder="ناوی خوێندنگەکەت چیە؟"
          label="خوێندنگە:"
        />
        <Input
          state={phone ?? ""}
          setState={setPhone}
          placeholder="ژمارەیەک بۆ پەیوەندیکردن"
          label="ژمارەی مۆبایل:"
        />
        <Input
          state={secondPhone ?? ""}
          setState={setSecondPhone}
          placeholder="ژمارەی تەلەفۆنی ماڵەوە"
          label="ژمارەی ماڵەوە:"
        />
        <Input
          state={address ?? ""}
          setState={setAddress}
          placeholder="ناونیشانی نیشتەجێبوون"
          label="ناونیشان:"
        />
        <Input
          state={health ?? ""}
          setState={setHealth}
          placeholder="هەر کێشەیەکی تەندروستی"
          label=" تەندروستی:"
        />
        <Select
          text="رەگەز"
          options={ragazakan}
          onSelectChange={handleRagazChange}
        />
        <Select
          text="پۆل"
          options={classes}
          onSelectChange={handleClasChange}
        />
        <Select
          text="جۆری خوێن"
          options={bloods}
          onSelectChange={handleBloodChange}
        />
        <Select
          text="هاتووچۆ"
          options={travels}
          onSelectChange={handleTravelChange}
        />
        <Select
          text="خول"
          options={courses}
          onSelectChange={handleCourseChange}
        />
        <div className="m-auto block">
          <AllTeachers />
        </div>
      </div>
      <div className="m-2">
        <MessageModal success={success} errors={errors} setErrors={setErrors} />
      </div>
      <div className="flex justify-center my-4">
        <button
          onClick={handleSave}
          className={`${rudaw.className} m-auto bg-blue-500 
                     hover:bg-blue-800 text-white font-bold py-2 
                     px-6 border border-blue-800 rounded text-2xl`}
        >
          <span>تۆمارکردن</span>
          {loading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : null}
        </button>
      </div>
    </div>
  );
};
