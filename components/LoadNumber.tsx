export default function LoadNumber() {
  return (
    <div className="">
      <select
        className="select select-bordered block bg-transparent"
        defaultValue="10"
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
