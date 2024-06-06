"use client";

import { supabase } from "@/utils/supabase/client";
import SingleTeacher from "@/components/teachers/SingleTeacher";
import Heading from "@/components/Heading";
import GeneralWrapper from "@/components/dashboard/GeneralWrapper";

async function TeachersPage() {
  const { error, data } = await supabase.from("teacher").select();
  if (error) {
    throw Error;
  }

  return (
    <GeneralWrapper>
      <div className="py-6">
      <Heading text="مامۆستایانی راڤە" />
      </div>
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
    </GeneralWrapper>
  );
}

export default TeachersPage;
