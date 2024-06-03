"use client";

import { useState } from "react";
import IncomeTable from "./IncomeTable";
import ExpenseTable from "./ExpenseTable";
import AccountingTableWrapper from "./AccountingTableWrapper";

export default function AccountingTable() {
  const [active, setActive] = useState(false)
  return (
    <>
      <AccountingTableWrapper>
      <div role="tablist" className={`tabs tabs-lifted w-full mt-8`}>
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-xl text-black checked:text-white"
          aria-label="داهات"
          checked={active === false}
          onChange={() => setActive(false)}
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
          onChange={() => setActive(true)}
        />
        <div
          role="tabpanel"
          className="tab-content border-base-300 rounded-box p-6"
        >
          <ExpenseTable />
        </div>
      </div>
      </AccountingTableWrapper>
    </>
  )
}
