 import { Course, Student, Teacher } from "@/lib/types";
import localFont from "next/font/local";

const bbc = localFont({ src: "/../app/sarkar_bbc.ttf" });

interface SelectNameProps {
  text: string;
  options: Teacher[] | Student[];
  onSelectChange: (value: string) => void; // Callback function to handle selected value
}
export default function SelectName({text, options, onSelectChange}: SelectNameProps) {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onSelectChange(selectedValue); // Call the callback function with selected value
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
            {item.name}
          </option>
        ))}
      </select>
  )
}
