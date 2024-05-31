 import { Course } from "@/lib/types";
import localFont from "next/font/local";

const bbc = localFont({ src: "/../app/sarkar_bbc.ttf" });

interface SelectTitleProps {
  text: string;
  options: Course[];
  onSelectChange: (value: string) => void; 
}
export default function SelectTitle({text, options, onSelectChange}: SelectTitleProps) {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onSelectChange(selectedValue); 
  };


  return (
      <select
        className={`${bbc.className} select input-bordered text-white m-2 w-full`}
        onChange={handleSelectChange}
      >
        <option disabled value="">
          {text}
        </option>
        {options.map((item) => (
          <option
            key={item.id}
            value={item.id}
            className={`${bbc.className}`}
          >
            {item.title}
          </option>
        ))}
      </select>
  )
}
