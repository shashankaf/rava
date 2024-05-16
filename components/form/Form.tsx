"use client";

import React, { useEffect, useState } from "react";
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
import {
  ragaz_fetcher,
  class_fetcher,
  bloods_fetcher,
  travel_fetcher,
  course_fetcher,
} from "../../lib/fetchers";
import AllTeachers from "./AllTeachers";
import { supabase } from "@/utils/supabase/client";

import localFont from "next/font/local";
import ErrorModal from "./ErrorModal";

const rudaw = localFont({ src: "/../../app/rudaw.ttf" });

const Form = () => {
  const [name, setName] = useAtom(nameAtom);
  const [school, setSchool] = useAtom(schoolAtom);
  const [phone, setPhone] = useAtom(phoneAtom);
  const [secondPhone, setSecondPhone] = useAtom(secondPhoneAtom);
  const [address, setAddress] = useAtom(addressAtom);
  const [health, setHealth] = useAtom(healthAtom);
  const [ragazakan, setRagazakan] = useState<{ id: string; title: string }[]>(
    [],
  );
  const [ragaz, setRagaz] = useState<{ id: string; title: string } | null>(
    null,
  );
  const [classes, setClasses] = useState<{ id: string; title: string }[]>([]);
  const [clas, setClas] = useState<{ id: string; title: string } | null>(null);
  const [bloods, setBloods] = useState<{ id: string; title: string }[]>([]);
  const [blood, setBlood] = useState<{ id: string; title: string } | null>(
    null,
  );
  const [travels, setTravels] = useState<{ id: string; title: string }[]>([]);
  const [travel, setTravel] = useState<{ id: string; title: string } | null>(
    null,
  );
  const [courses, setCourses] = useState<{ id: string; title: string }[]>([]);
  const [course, setCourse] = useState<{ id: string; title: string } | null>(
    null,
  );
  const [teacher] = useAtom(teacherAtom);
  const [errors, setErrors] = useState<string[]>([]);

  const fetch_ragaz_data = async () => {
    const data = await ragaz_fetcher();
    if (data) {
      setRagazakan(data);
    }
  };
  useEffect(() => {
    fetch_ragaz_data();
  }, []);

  const fetch_class_data = async () => {
    const data = await class_fetcher();
    if (data) {
      setClasses(data);
    }
  };
  useEffect(() => {
    fetch_class_data();
  }, []);

  const fetch_bloods_data = async () => {
    const data = await bloods_fetcher();
    if (data) {
      setBloods(data);
    }
  };
  useEffect(() => {
    fetch_bloods_data();
  }, []);

  const fetch_travel_data = async () => {
    const data = await travel_fetcher();
    if (data) {
      setTravels(data);
    }
  };
  useEffect(() => {
    fetch_travel_data();
  }, []);

  const fetch_courses_data = async () => {
    const data = await course_fetcher();
    if (data) {
      setCourses(data);
    }
  };
  useEffect(() => {
    fetch_courses_data();
  }, []);

  const handleError = (errorMessage: string) => {
    setErrors((prev) => [...prev, errorMessage]);
  };

  const handleSave = async () => {
    console.log(clas, course)
    const info = {
      name,
      class: clas?.id,
      school,
      blood: blood?.id,
      phone,
      second_phone: secondPhone,
      course,
      address,
      travel: travel?.id,
      health,
      ragaz: ragaz?.id,
      teacher: teacher,
    };
    if (name.length < 2) {
      const msg = "تکایە ناوێکی گونجاو هەڵبژێرە";
      handleError(msg);
    }
    if (clas === null) {
      const msg = "تکایە دیاریبکە لە چ پۆلێکیت";
      handleError(msg);
    }
    if (course === null) {
      const msg = "تکایە خولێک هەڵبژێرە";
      handleError(msg);
    }
    if (teacher.length === 0) {
      const msg = "تکایە مامۆستایەک یان زیاتر هەڵبژێرە";
      handleError(msg);
    }
    if (errors.length > 0) {
      return;
    }
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
          item={ragaz}
          setItem={setRagaz}
        />
        <Select text="پۆل" options={classes} item={clas} setItem={setClas} />
        <Select
          text="جۆری خوێن"
          options={bloods}
          item={blood}
          setItem={setBlood}
        />
        <Select
          text="هاتووچۆ"
          options={travels}
          item={travel}
          setItem={setTravel}
        />
        <Select
          text="خول"
          options={courses}
          item={course}
          setItem={setCourse}
        />
        <div className="m-auto">
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
                     hover:bg-blue-700 text-white font-bold py-2 
                     px-6 border border-blue-700 rounded text-2xl`}
        >
          تۆمارکردن
        </button>
      </div>
    </div>
  );
};

export default Form;
