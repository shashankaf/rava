"use server";

import { supabase } from "@/utils/supabase/client";

const uploadPhoto = async (photo: any) => {
  if (!photo) return; 
  const now = new Date();
  const stringDate = `${now}`;
  const lowerTrim = stringDate.toLowerCase().replace(/\W/g, "");
  const { data, error } = await supabase.storage
    .from("teacher_photos")
    .upload(lowerTrim, photo);

  if (error) {
    console.error("Error uploading photo:", error.message);
    return;
  }
  if (data) {
    return data.fullPath;
  }
};

export async function createTeacher(prevState: any, formData: FormData) {
  const file = formData.get("photo") as File;
  const photo = await uploadPhoto(file);
  const remaining =
    "https://grocviikgcjxaxnkdvrv.supabase.co/storage/v1/object/public/";
  const fullURL = `${remaining}${photo}`;
  const rawFormData = {
    name: formData.get("name"),
    specialty: formData.get("specialty"),
    bio: formData.get("bio"),
    order: formData.get("order"),
    photo: fullURL,
  };
  const {error, data} = await supabase.from('teacher').insert(rawFormData)
  if(error) {
    console.log(error)
  }
  return {
    success: data,
  };
}


