"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AddBtn from "@/components/AddBtn";
import DashboardTitle from "@/components/DashboardTitle";
import LoadNumber from "@/components/LoadNumber";
import Search from "@/components/Search";
import { Course } from "@/lib/types";

export default function CoursesTableWrapper({
  children,
  courses,
}: {
  children: React.ReactNode;
  courses: Course[];
}) {
  const [text, setText] = React.useState<string>("");
  const [, setFilteredCourses] = React.useState<Course[]>([]);

  const handleSearch = (searchText: string) => {
    const filtered = courses.filter((course) =>
      course.title?.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredCourses(filtered);
  };

  const router = useRouter();
  return (
    <div dir="rtl" className="text-black pt-20 xs:w-screen">
      <div className="flex flex-wrap justify-between items-center">
        <DashboardTitle text=" بەڕێوەبردنی خولەکان" />
        <AddBtn handleAdd={() => router.push("/dashboard/courses/create")} />
        <div className="flex flex-wrap flex-row items-center justify-center gap-2">
          <Search text={text} setText={setText} handleSearch={handleSearch} />
          <LoadNumber />
        </div>
      </div>
      {children}
    </div>
  );
}
