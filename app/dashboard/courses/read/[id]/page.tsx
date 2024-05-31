import { formatDate } from "@/lib/formatDate";
import { supabase } from "@/utils/supabase/client";
import localFont from "next/font/local";

const bbc = localFont({ src: "/../../../../sarkar_bbc.ttf" });

export default async function ReadCourse({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  let { error, data } = await supabase
    .from("course")
    .select()
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }

  if (!id) {
    return;
  }

  return (
    <div
      className={`${bbc.className} text-black mt-24`}
      dir="rtl"
    >
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-4">{data?.title}</h1>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="col-span-1">
              <div className="mt-2">
                <h2 className="text-lg font-semibold mb-2">رۆژی دەستپێک</h2>
                <p>{formatDate(data?.start)}</p>
              </div>
              <div className="mt-2">
                <h2 className="text-lg font-semibold mb-2">رۆژی کۆتایی</h2>
                <p>{formatDate(data?.end)}</p>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
