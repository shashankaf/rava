//@ts-nocheck
"use client";

import { LegacyRef, useEffect, useState } from "react";
import localFont from "next/font/local";
import { supabase } from "@/utils/supabase/client";
import Label from "../form/Label";
import Heading from "../Heading";

const bbc = localFont({ src: "/../../app/sarkar_bbc.ttf" });

interface QuestionModalProps {
  modalRef: LegacyRef<HTMLDialogElement>;
  id: string | null;
}
interface Table {
  id: number;
  title: string;
}
interface Course {
  id: string;
  title: string;
}

interface FormState {
  name: string;
  clas: string | null;
  school: string;
  blood: string | null;
  phone: string;
  secondPhone: string;
  address: string;
  travel: string | null;
  health: string;
  ragaz: string | null;
  teacher: string[];
  pay: string;
  secondPay: string;
  course: string | null;
}

export default function StudentUpdateModal({
  modalRef,
  id,
}: QuestionModalProps) {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    clas: null,
    school: "",
    blood: null,
    phone: "",
    secondPhone: "",
    address: "",
    travel: null,
    health: "",
    ragaz: null,
    teacher: [],
    pay: "",
    secondPay: "",
    course: null,
  });

  const [bloods, setBloods] = useState<Table[]>([]);
  const [classes, setClasses] = useState<Table[]>([]);
  const [travels, setTravels] = useState<Table[]>([]);
  const [ragazakan, setRagazakan] = useState<Table[]>([]);
  const [teachers, setTeachers] = useState<Table[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      const { error, data } = await supabase.rpc("fetch_multiple_tables");
      if (error) {
        console.log(error);
      }
      if (data) {
        setBloods(data.blood);
        setCourses(data.course);
        setRagazakan(data.ragaz);
        setTravels(data.travel);
        setClasses(data.class);
        setTeachers(data.teacher);
      }
    };
    fetchAll();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const { data, error } = await supabase
          .from("student") // assuming your table is named 'students'
          .select()
          .eq("id", id)
          .single(); // Fetch a single student's data. Adjust as necessary.

        if (error) {
          console.error("Error fetching data:", error);
          return;
        }

        const { secondpay, second_phone, class: dbClass, ...rest } = data;

        setFormState((prevState) => ({
          ...prevState,
          secondPay: secondpay,
          secondPhone: second_phone,
          clas: dbClass,
          ...rest,
        }));
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const camelToSnakeCase = (str: string) =>
    str.replace(/([A-Z])/g, "_$1").toLowerCase();

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (id !== null) {
      try {
        const updatedData: { [key: string]: any } = {};
        for (let key in formState) {
          let dbKey = camelToSnakeCase(key);
          if (dbKey === "clas") {
            dbKey = "class";
          }
          if (dbKey === "second_pay") {
            dbKey = "secondpay";
          }
          updatedData[dbKey] = formState[key as keyof FormState];
        }

        const { error, data } = await supabase
          .from("student")
          .update(updatedData)
          .eq("id", id);

        if (error) {
          console.log(error);
        } else {
          console.log("Data updated successfully:", data);
          modalRef.current.close()
          fetchAll()
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
  const classOptions = classes.map((c) => (
    <option key={c.id} value={c.id}>
      {c.title}
    </option>
  ));
  const bloodOptions = bloods.map((b) => (
    <option key={b.id} value={b.id}>
      {b.title}
    </option>
  ));
  const travelOptions = travels.map((t) => (
    <option key={t.id} value={t.id}>
      {t.title}
    </option>
  ));
  const ragazOptions = ragazakan.map((r) => (
    <option key={r.id} value={r.id}>
      {r.title}
    </option>
  ));
  const teacherOptions = teachers.map((t) => (
    <option key={t.id} value={t.id}>
      {t.name}
    </option>
  ));
  const courseOptions = courses.map((c) => (
    <option key={c.id} value={c.id}>
      {c.title}
    </option>
  ));

  return (
    <dialog ref={modalRef} className={`${bbc.className} modal text-white`}>
      <div className="modal-box">
        <Heading text="نوێکردنەوەی خوێندکار" color="text-white" />
        <form className="form" onSubmit={handleUpdate}>
          <div>
            <Label>ناوی خوێندکار</Label>
            <input
              className="input input-bordered w-full m-2"
              name="name"
              value={formState.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>خوێندنگە</Label>
            <input
              className="input input-bordered w-full m-2"
              name="school"
              value={formState.school}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>مۆبایل</Label>
            <input
              className="input input-bordered w-full m-2"
              name="phone"
              value={formState.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>ژمارەی ماڵەوە</Label>
            <input
              className="input input-bordered w-full m-2"
              name="secondPhone"
              value={formState.secondPhone}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>ناونیشان</Label>
            <input
              className="input input-bordered w-full m-2"
              name="address"
              value={formState.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>تەندروستی</Label>
            <input
              className="input input-bordered w-full m-2"
              name="health"
              value={formState.health}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>پارەی یەکەم</Label>
            <input
              className="input input-bordered w-full m-2"
              name="pay"
              value={formState.pay}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>پارەی دووەم</Label>
            <input
              className="input input-bordered w-full m-2"
              name="secondPay"
              value={formState.secondPay}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>پۆل</Label>
            <select
              name="clas"
              className="select input-bordered text-white m-2 w-full"
              value={formState.clas || ""}
              onChange={(e) => handleSelectChange("clas", e.target.value)}
            >
              {classOptions}
            </select>
          </div>
          <div>
            <Label>خوێن</Label>
            <select
              name="blood"
              className="select input-bordered text-white m-2 w-full"
              value={formState.blood || ""}
              onChange={(e) => handleSelectChange("blood", e.target.value)}
            >
              {bloodOptions}
            </select>
          </div>
          <div>
            <Label>هاتووچۆ</Label>
            <select
              name="travel"
              className="select input-bordered text-white m-2 w-full"
              value={formState.travel || ""}
              onChange={(e) => handleSelectChange("travel", e.target.value)}
            >
              {travelOptions}
            </select>
          </div>
          <div>
            <Label>رەگەز</Label>
            <select
              name="ragaz"
              className="select input-bordered text-white m-2 w-full"
              value={formState.ragaz || ""}
              onChange={(e) => handleSelectChange("ragaz", e.target.value)}
            >
              {ragazOptions}
            </select>
          </div>
          <div>
            <Label>مامۆستا</Label>
            <select
              name="teacher"
              className="select input-bordered text-white m-2 w-full"
              value={formState.teacher || ""}
              onChange={(e) => handleSelectChange("teacher", e.target.value)}
            >
              {teacherOptions}
            </select>
          </div>
          <div>
            <Label>خول</Label>
            <select
              name="course"
              className="select input-bordered text-white m-2 w-full"
              value={formState.course || ""}
              onChange={(e) => handleSelectChange("course", e.target.value)}
            >
              {courseOptions}
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-error text-white mx-[2px] w-24"
          >
            بەڵێ
          </button>
          <button
            type="button"
            className="btn btn-info text-white mx-[2px] w-24"
            onClick={() => (modalRef.current as HTMLDialogElement).close()}
          >
            نەخێر
          </button>
        </form>
      </div>
    </dialog>
  );
}
