"use client";

import React, { useState, useEffect } from "react";
import TeacherComponent from "./TeacherComponent";
import { supabase } from "@/utils/supabase/client";

const AllTeachers = () => {
  const [teachers, setTeachers] = useState<any[]>([])
  const fetcher = async () => {
    try {
      const { data, error } = await supabase.from("teacher").select();
      if (error) throw Error;
      setTeachers(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetcher();
  }, []);

  return (
    <TeacherComponent options={teachers} text="وانە و مامۆستا هەڵبژێرە" />
  );
};

export default AllTeachers;
