import Sidebar from "@/components/dashboard/Sidebar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DefaultLayout({children}: {children: React.ReactNode;}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <>
      <div className="">
      <Sidebar />
      </div>
      <div>
      {children}
      </div>
    </>
  );
}
