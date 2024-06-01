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
import ErrorModal from "./ErrorModal";

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

const Form = ({ ragazakan, classes, bloods, travels, courses }: DataType) => {
  const [name, setName] = useAtom<string>(nameAtom);
  const [school, setSchool] = useAtom<string>(schoolAtom);
  const [phone, setPhone] = useAtom<string>(phoneAtom);
  const [secondPhone, setSecondPhone] = useAtom<string>(secondPhoneAtom);
  const [address, setAddress] = useAtom<string>(addressAtom);
  const [health, setHealth] = useAtom<string>(healthAtom);

  const [teacher] = useAtom(teacherAtom);
  const [errors, setErrors] = useState<string[]>([]);

  const handleError = (errorMessage: string) => {
    setErrors((prev) => [...prev, errorMessage]);
  };

  const [selectedRagaz, setSelectedRagaz] = useState<string | null>(null);
  const [selectedClas, setSelectedClas] = useState<string | null>(null);
  const [selectedBlood, setSelectedBlood] = useState<string | null>(null);
  const [selectedTravel, setSelectedTravel] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const handleRagazChange = (value: string) => {
    setSelectedRagaz(value);
  };
  const handleClasChange = (value: string) => {
    setSelectedClas(value);
  };
  const handleBloodChange = (value: string) => {
    setSelectedBlood(value);
  };
  const handleTravelChange = (value: string) => {
    setSelectedTravel(value);
  };
  const handleCourseChange = (value: string) => {
    setSelectedCourse(value);
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // Ensure these validations are done before the Number() conversions
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
      return;
    }
    
    // Convert inputs after validation
    const clas = Number(selectedClas);
    const blud = Number(selectedBlood);
    const travul = Number(selectedTravel);
    const ragoz = Number(selectedRagaz);

    // Prepare the info object
    const info = {
      name,
      class: clas,
      school,
      blood: blud,
      phone,
      second_phone: secondPhone,
      course: selectedCourse,
      address,
      travel: travul,
      health,
      ragaz: ragoz,
      teacher,
    };

    // Insert the data
    const { error } = await supabase.from("student").insert(info);

    if (error) {
      console.log(error);
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
          state={name}
          setState={setName}
          placeholder="ناوی سیانییت چیە؟"
          label="ناو:"
        />
        <Input
          state={school}
          setState={setSchool}
          placeholder="ناوی خوێندنگەکەت چیە؟"
          label="خوێندنگە:"
        />
        <Input
          state={phone}
          setState={setPhone}
          placeholder="ژمارەیەک بۆ پەیوەندیکردن"
          label="ژمارەی مۆبایل:"
        />
        <Input
          state={secondPhone}
          setState={setSecondPhone}
          placeholder="ژمارەی تەلەفۆنی ماڵەوە"
          label="ژمارەی ماڵەوە:"
        />
        <Input
          state={address}
          setState={setAddress}
          placeholder="ناونیشانی نیشتەجێبوون"
          label="ناونیشان:"
        />
        <Input
          state={health}
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
        <ErrorModal errors={errors} setErrors={setErrors} />
      </div>
      <div className="flex justify-center my-4">
        <button
          onClick={handleSave}
          className={`${rudaw.className} m-auto bg-blue-500 
                     hover:bg-blue-800 text-white font-bold py-2 
                     px-6 border border-blue-800 rounded text-2xl`}
        >
          تۆمارکردن
        </button>
      </div>
    </div>
  );
};

export default Form;
