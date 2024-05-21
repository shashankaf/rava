export default function Pagination() {
  return (
    <div className="flex justify-start">
      <div className="join bg-transparent text-black my-2">
        <button className="join-item btn bg-transparent text-black border-gray-300 hover:border-gray-400 hover:bg-gray-200 transition-all duration-400">
          1
        </button>
        <button className="join-item btn bg-transparent text-black border-gray-300 hover:border-gray-400 hover:bg-gray-200 transition-all duration-400">
          2
        </button>
        <button className="join-item btn bg-transparent text-black border-gray-300 hover:border-gray-400 hover:bg-gray-200 transition-all duration-400">
          ...
        </button>
        <button className="join-item btn bg-transparent text-black border-gray-300 hover:border-gray-400 hover:bg-gray-200 transition-all duration-400">
          99
        </button>
        <button className="join-item btn bg-transparent text-black border-gray-300 hover:border-gray-400 hover:bg-gray-200 transition-all duration-400">
          100
        </button>
      </div>
    </div>
  );
}
