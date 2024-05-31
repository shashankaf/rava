import { supabase } from "@/utils/supabase/client";
import localFont from "next/font/local";

const bbc = localFont({ src: "/../../../../sarkar_bbc.ttf" });
const rudaw = localFont({ src: "/../../../../rudaw.ttf" });

export default async function ReadStudent({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const { error, data } = await supabase
    .from("student")
    .select(
      `*, class(title), ragaz(title), blood(title), course(title), travel(title)`,
    )
    .eq("id", id)
    .single();
  if (error) {
    throw Error;
  }
  if (!id) {
    console.log("hello");
  }

  return (
    <div className={`${bbc.className} max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg text-black mt-24`}>
      <h1 className={`${rudaw.className} text-2xl font-bold mb-6`}>پرۆفایلی خوێندکار</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <span className="font-semibold">ناو:</span>
          <span>{data.name}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">پۆل:</span>
          <span>{`${data.class?.title}`}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">رەگەز:</span>
          <span>{`${data.ragaz?.title}`}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">خوێندنگە:</span>
          <span>{`${data.school}`}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">ژمارەی مۆبایل:</span>
          <span>{`${data.phone}`}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">ژمارەی ماڵەوە:</span>
          <span>{`${data.second_phone}`}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">ناونیشان:</span>
          <span>{`${data.address}`}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">خول:</span>
          <span>{`${data.course?.title}`}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">هاتووچۆ:</span>
          <span>{`${data.travel?.title}`}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">جۆری خوێن:</span>
          <span>{`${data.blood?.title}`}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">تەندروستی:</span>
          <span>{`${data.health}`}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">بڕی پارەی یەکەم:</span>
          <span>{`${data.pay}`}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">بڕی پارەی دووەم:</span>
          <span>{`${data.secondpay}`}</span>
        </div>
      </div>
    </div>
  );
}
