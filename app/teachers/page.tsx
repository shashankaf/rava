"use client";

import { supabase } from "@/utils/supabase/client";
import SingleTeacher from "@/components/teachers/SingleTeacher";
import Heading from "@/components/Heading";

async function TeachersPage() {
    const { error, data } = await supabase.from("teacher").select();
    if (error) {
      throw Error;
    }

  return (
    <div className="my-24">
      <Heading text="مامۆستایانی راڤە" />
      <div className="flex flex-row justify-center flex-wrap gap-4">
        {data?.map((item) => {
          return (
            <div key={item.id}>
              <SingleTeacher
                title={item?.name || ""}
                alt={item?.name || "Teacher Photo"}
                image={item?.photo || ""}
                specialty={item?.specialty || ""}
                id={item?.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TeachersPage;
