import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/dashboard");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <div dir="rtl" className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underlin flex text-gray-900 items-center group text-sm"
      >
        گەڕانەوە
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
      </Link>

      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-gray-900">
        <label className="text-md" htmlFor="email">
          ئیمەیل
        </label>
        <input
          className="rounded-md px-4 py-2 border mb-6 input"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md text-gray-900" htmlFor="password">
          وشەی نهێنی
        </label>
        <input
          className="rounded-md px-4 py-2 border mb-6 input"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton
          formAction={signIn}
          className="rounded-md px-4 py-2 mb-2 btn btn-primary text-white"
          pendingText="Signing In..."
        >
          چوونە ژوورەوە
        </SubmitButton>
        {/* <SubmitButton
          formAction={signUp}
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing Up..."
        >
          Sign Up
        </SubmitButton> */}
        {searchParams?.message && (
          <p className="mt-4 p-4  text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
