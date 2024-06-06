"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Income, ShareBare, Teacher } from "@/lib/types";
import { supabase } from "@/utils/supabase/client";

interface ExpenseCalcProps {
  income: Income;
  item: Teacher;
  bg: string;
}
export default function ExpenseCalculator({ income, item, bg }: ExpenseCalcProps) {
  const courseId = income.course;
  const studentId = income.student;
  const teacherId = item.id;
  const [share, setShare] = useState<ShareBare | null>(null);

  const router = useRouter();

  const shareFetcher = async () => {
    if (courseId !== null) {
      const { data, error } = await supabase
        .from("share")
        .select()
        .eq("course", courseId)
        .eq("teacher", teacherId)
        .single();
      if (error) {
        console.log(error);
      }
      setShare(data);
    }
  };

  useEffect(() => {
    shareFetcher();
  }, [income]);

  const handleExpense = async () => {
    const percentage = Number(share?.percentage) / 100;
    const amount = Number(income.amount) * percentage;
    const { error } = await supabase.from("expense").insert({
      amount,
      expense_type: "course",
      course: courseId,
      teacher: item.id,
      student: studentId?.id,
    });
    if (error) {
      console.log(error);
    } else {
      const existingShares = income.spent_shares || []; // Handle case where spent_shares is null or undefined
      const updatedShares = [...existingShares, item.id];
      const { error } = await supabase
        .from("income")
        .update({ spent_shares: updatedShares })
        .eq("id", income.id);
      if (error) {
        console.log(error);
      }
      router.push("../../");
    }
  };

  return (
    <div dir="rtl" className="flex flex-row justify-between my-6 w-full">
      <button
        onClick={handleExpense}
        className={`px-4 py-2 bg-${bg}-500 hover:bg-${bg}-800 text-white rounded-md outline-none text-xl`}
      >
        {item.name}
      </button>
    </div>
  );
}
