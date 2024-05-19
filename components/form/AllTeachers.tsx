import TeacherComponent from "./TeacherComponent";
import { supabase } from "@/utils/supabase/client";

const AllTeachers = async () => {
  const { data, error } = await supabase.from("teacher").select();
  if (error) throw Error;

  return <TeacherComponent options={data} text="وانە و مامۆستا هەڵبژێرە" />;
};

export default AllTeachers;
