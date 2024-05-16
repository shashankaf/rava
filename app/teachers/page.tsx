"use client"

import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/server";
import SingleTeacher from "@/components/teachers/SingleTeacher";
import Heading from "@/components/Heading";

function TeachersPage() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const fetchTeachers = async () => {
    const { error, data } = await supabase.from("teacher").select();
    if (error) {
      throw Error;
    }
    setTeachers(data);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);
  return (
    <div className="mt-24">
      <Heading text="مامۆستایانی راڤە" />
      <div className="flex flex-row justify-center flex-wrap gap-4">
        {teachers.map((item) => {
          return (
            <div key={item.id}>
              <SingleTeacher
                title={item.name}
                alt={item.name}
                image={item.photo}
                specialty={item.specialty}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TeachersPage;
