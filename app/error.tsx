"use client"; 

import { useEffect } from "react";
import localFont from "next/font/local";

const bbc = localFont({ src: "./sarkar_bbc.ttf" });

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <h2 className={`${bbc.className} text-2xl`}>هەڵەیەک روویداوە</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
