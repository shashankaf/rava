import { supabase } from "@/utils/supabase/client";
import Image from "next/image";
import localFont from "next/font/local";

const bbc = localFont({ src: "/../../../../sarkar_bbc.ttf" });

export default async function ReadTeacher({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const { error, data: teacher } = await supabase
    .from("teacher")
    .select()
    .eq("id", id)
    .single();
  if (error) {
    throw Error;
  }
  if (!id) {
    return;
  }

  return (
    <section
      className={`${bbc.className} pt-10 overflow-hidden text-right mt-24`}
    >
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl ">
        <div className="grid items-center grid-cols-1 md:grid-cols-2">
          <div className="m-4">
            <h2
              className={`text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl`}
            >
              <br className="block sm:hidden" />
              👋 سڵاو، من
              <br className="block sm:hidden" />
              {` ${teacher.name}م`}{" "}
            </h2>
            <p className={`text-2xl my-2 py-2 font-bold`}>
              مامۆستای {teacher.specialty}
            </p>
            <p className="mt-4 text-xl text-gray-600 md:mt-8">
              <span className="relative inline-block">
                <span className="absolute inline-block w-full bottom-0.5 h-2 bg-yellow-300 "></span>
                <span className={`relative`}>
                  {" "}
                  دەتوانیت پەیوەندیم پێوەبکەیت لە پەیمانگای راڤە{" "}
                </span>
              </span>
              <span className="block mt-2">(+964) 07709746664</span>
              <span className="block mt-2">(+964) 07509746664</span>
              <br className="block sm:hidden" />
            </p>
          </div>

          <div className="relative">
            <Image
              className="relative h-full rounded-lg"
              src={`${teacher.photo}`}
              alt={`${teacher.name}`}
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
