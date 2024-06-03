import localFont from "next/font/local";

const rudaw = localFont({ src: "/../app/rudaw.ttf" });

interface SearchProps {
  text: string;
  setText: (value: string) => void;
  handleSearch: (value: string) => void;
}

export default function Search({ text, setText, handleSearch }: SearchProps) {
  return (
    <label className={`${rudaw.className} input input-bordered flex items-center gap-2 bg-transparent m-2`}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        className="grow bg-transparent"
        placeholder="گەڕان"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-8 h-8 opacity-80 text-indigo-400 hover:text-indigo-800 transition-all duration-400 cursor-pointer"
        onClick={() => handleSearch(text)}
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  );
}
