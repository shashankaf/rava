//@ts-nocheck

import React from "react";

interface StudentTableProps {
  tableHeads: string[];
  tableContent: any;
  title: string;
}

const StudentTable = ({
  tableHeads,
  tableContent,
}: StudentTableProps) => {
  return (
    <>
      <div className="relative w-screen overflow-x-auto shadow-md sm:rounded-lg">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {tableHeads.map((item) => {
                  return (
                    <th key={item} scope="col" className="px-6 py-3">
                      {item}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {tableContent?.map((item) => {
                return (
                  <tr
                    key={item?.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item?.name}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item?.class?.title}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item?.course?.title}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StudentTable;
