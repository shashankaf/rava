"use client"
import { useEffect, useState } from "react";
import TeacherComponent from "./TeacherComponent";
import { supabase } from "@/utils/supabase/client";
import { Teacher } from "@/lib/types";

const AllTeachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([])

  useEffect(() => {
    const fetchAll = async () => {
      const { error, data } = await supabase.from("teacher").select();
      if (error) {
        console.log(error);
      }
      if (data) {
        setTeachers(data);
      }
    };
    fetchAll();
  }, []);

  return <TeacherComponent options={teachers} text="وانە و مامۆستا هەڵبژێرە" />;
};

export default AllTeachers;
