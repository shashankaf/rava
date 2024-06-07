"use client";

import { LegacyRef, useEffect, useState } from "react";
import localFont from "next/font/local";
import SelectName from "../SelectName";
import SelectTitle from "../SelectTitle";
import { course_fetcher, teacher_fetcher } from "@/lib/fetchers";
import DateRangePicker from "@/components/DateRangePicker"; // Import the DateRangePicker component
import { Course, Teacher } from "@/lib/types";
import Label from "../form/Label";
import TimeRangePicker from "../TimeRangePicker";

const bbc = localFont({ src: "/../../app/sarkar_bbc.ttf" });

interface QuestionModalProps {
  modalRef: LegacyRef<HTMLDialogElement>;
}

const PrivateModal: React.FC<QuestionModalProps> = ({ modalRef }) => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [teacher, setTeacher] = useState<string | null>(null);
  const [course, setCourse] = useState<string | null>(null);
  const [dates, setDates] = useState<string[]>([]);
  const [times, setTimes] = useState<string[]>([]);

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const data = await teacher_fetcher();
      if (data) {
        setTeachers(data);
      }
    };

    const fetchCourses = async () => {
      const data = await course_fetcher();
      if (data) {
        setCourses(data);
      }
    };
    fetchTeachers();
    fetchCourses();
  }, []);

  const changeTeacher = (value: string) => {
    setTeacher(value);
  };

  const changeCourse = (value: string) => {
    setCourse(value);
  };

  const handleDateRangeSelect = (startDate: Date | null, endDate: Date | null) => {
    if (startDate && endDate) {
      setDates([startDate.toISOString(), endDate.toISOString()]);
    }
  };

  const handleTimeRangeSelect = (startTime: Date | null, endTime: Date | null) => {
    if (startTime && endTime) {
      setTimes([startTime.toISOString(), endTime.toISOString()]);
    }
  };

  const addLecture = () => {
    console.log(name, phone, teacher, course, dates, times);
  };

  return (
    <dialog ref={modalRef} className={`${bbc.className} modal`}>
      <div className="modal-box">
        <h2 className="font-bold text-xl text-white">تۆمارکردنی وانەی تایبەت</h2>
        <div className="modal-action">
          <form className="dialog-form flex flex-row flex-wrap max-w-4xl gap-2 justify-center">
            <Label>ناوی خوێندکار</Label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full m-2 text-white"
              placeholder="ناو"
            />

            <Label>ژمارەی تەلەفۆن</Label>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input input-bordered w-full m-2 text-white"
              placeholder="ژمارەی تەلەفۆن"
            />

            <Label>مامۆستای داواکراو</Label>
            <SelectName options={teachers} text="مامۆستای پەیوەندیدار" onSelectChange={changeTeacher} />

            <Label>خولی داواکراو</Label>
            <SelectTitle options={courses} text="خولی پەیوەندیدار" onSelectChange={changeCourse} />

            <div className="flex flex-col gap-2 justify-center items-center">
              <Label>رۆژانی وانەی تایبەت</Label>
              <DateRangePicker onSelect={handleDateRangeSelect} />
            </div>

            <div className="flex flex-col gap-2 justify-center items-center my-2">
              <Label>کاتی وانە</Label>
              <TimeRangePicker onSelect={handleTimeRangeSelect} />
            </div>

            <div className="flex flex-row items-center justify-center my-4">
              <button onClick={addLecture} className="btn btn-error text-white mx-[2px] w-24">
                بەڵێ
              </button>
              <button className="btn btn-info text-white mx-[2px] w-24">نەخێر</button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default PrivateModal;
