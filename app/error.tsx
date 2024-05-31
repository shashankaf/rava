'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 import localFont from "next/font/local";

const bbc = localFont({ src: "./sarkar_bbc.ttf" });


export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='min-h-screen w-full flex justify-center items-center'>
      <h2 className={`${bbc.className} text-2xl`}>هەڵەیەک روویداوە</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}
