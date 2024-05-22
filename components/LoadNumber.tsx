
import { useAtom } from "jotai";
import { pageLimitAtom } from "@/lib/store";

export default function LoadNumber() {
  const [pageLimit, setPageLimit] = useAtom(pageLimitAtom);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageLimit(parseInt(event.target.value, 10));
  };

  return (
    <div className="">
      <select
        className="select select-bordered block bg-transparent"
        defaultValue={pageLimit}
        onChange={handleChange}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
}

