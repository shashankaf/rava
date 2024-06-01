import Image from "next/image"
import Link from "next/link"
import React from "react"
import localFont from "next/font/local";

const rudaw = localFont({ src: "../../app/rudaw.ttf" });


interface SingleProps {
  image: string,
  alt: string,
  title: string,
  specialty: string,
  id: string
}
const SingleTeacher = ({image, alt, title, specialty, id}: SingleProps) => {
  return (
    <Link href={`/teachers/${id}`} className={`${rudaw.className} hover:scale-105 tansition-all duration-500 shadow-md shadow-gray-200 relative isolate flex flex-col flex-wrap justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 w-72 h-96 mx-auto`}>
      <Image src={image} alt={alt} className="absolute inset-0 object-cover"  width={500} height={800} />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
        <h3 className="z-10 mt-3 text-3xl font-bold text-white">{title}</h3>
        <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">{specialty}</div>
    </Link>
  )
}

export default SingleTeacher
