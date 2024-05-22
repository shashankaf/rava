"use client"

import React, {useState} from "react";
import ExpenseTable from "@/components/dashboard/accounting/ExpenseTable";
import IncomeTable from "@/components/dashboard/accounting/IncomeTable";
import localFont from "next/font/local";

const rudaw = localFont({ src: "../../rudaw.ttf" });


const Accounting = () => {
  const [active, setActive] = useState(false)
  return (
    <>
      <div role="tablist" className={`${rudaw.className} tabs tabs-lifted w-full mt-24`}>
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-xl text-black checked:text-white"
          aria-label="داهات"
          checked={active === false}
          onClick={() => setActive(false)}
        />
        <div
          role="tabpanel"
          className="tab-content border-base-300 rounded-box p-6"
        >
          <IncomeTable />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-xl text-black checked:text-white"
          aria-label="خەرجی"
          checked={active === true}
          onClick={() => setActive(true)}
        />
        <div
          role="tabpanel"
          className="tab-content border-base-300 rounded-box p-6"
        >
          <ExpenseTable />
        </div>
      </div>{" "}
    </>
  );
};

export default Accounting;
