import { supabase } from "@/utils/supabase/client"
import TopTeacher from "./TopTeacher"

export default async function TopTeachers() {
  const {error, data} = await supabase.rpc("get_most_popular_teachers").limit(6)
  if(error) {
    throw Error
  }
  return (
  <>
      {data.map(teacher => {
        return <TopTeacher
                  name={teacher.name}
                  image={teacher.photo}
                  specialty={teacher.specialty}
                  popularity_count={teacher.popularity_count}
                  />
      })}
  </>
  )
}

