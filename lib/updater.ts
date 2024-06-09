import { supabase } from "@/utils/supabase/client";

export async function update_event(bool: boolean, id: string) {
  const {error} = await supabase.from("private_lecture").update({
    approved: bool
  }).eq('id', id)
  if(error) {
    console.log(error)
    return null;
  }
  return null;
}
