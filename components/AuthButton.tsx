import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import localFont from "next/font/local";

const shasenem = localFont({ src: "/../app/shasenem.ttf" });

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className={`${shasenem.className} flex items-center gap-4`}>
      Hey, {user.email}!
      <form action={signOut}>
        <button className="px-4 py-[2px] rounded-lg bg-indigo-400 hover:bg-indigo-600 transition duration-500 ease-in-out text-white text-lg">
          دەرچوون لە ئەکاونت
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="px-4 py-[2px] rounded-lg bg-indigo-400 hover:bg-indigo-600 transition duration-500 ease-in-out text-white"
    >
      چوونە ناوەوە
    </Link>
  );
}
