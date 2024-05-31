//@ts-nocheck
import AccountingBox from "@/components/dashboard/AccountingBox";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { supabase } from "@/utils/supabase/client";
import StudentTable from "@/components/dashboard/StudentTable";
import TopTeachers from "@/components/dashboard/TopTeachers";
import Divider from "@/components/Divider";
import NumberBox from "@/components/dashboard/NumberBox";
import localFont from "next/font/local";

const bbc = localFont({ src: "../sarkar_bbc.ttf" });

async function Home() {
  const { error, data } = await supabase
    .from("student")
    .select(`*, course(*), class(*)`)
    .limit(10)
    .order("created_at", { ascending: false });
  if (error) {
    throw Error;
  }

  const {error:err, data:summary_counts} = await supabase.rpc("get_summary_counts").select()
  if(err) {
    throw Error;
  }

  const {error:er, data: finance} = await supabase.rpc("get_financial_summary").select()
  if(er) {
    throw Error;
  }

  return (
    <div dir="rtl" className={`${bbc.className} w-full mt-16`}>
      <Divider text="داهات و خەرجی" />
      <div className="flex justify-between w-full flex-wrap">
        <AccountingBox text="داهات" money={finance?.income} color="bg-purple-700">
          <FaMoneyBill1Wave />
        </AccountingBox>
        <AccountingBox text="خەرجی" money={finance?.expense} color="bg-indigo-700">
          <FaMoneyBillTrendUp />
        </AccountingBox>
        <AccountingBox text="دەستمایە" money={finance?.net} color="bg-pink-700">
          <FaMoneyBillTransfer />
        </AccountingBox>
      </div>

      <div className="flex flex-wrap">
        <div className="w-full lg:w-2/3 p-4">
          <Divider text="دوایین خوێندکاران" />
          <div className="overflow-x-auto">
            <StudentTable
              title="دوایین خوێندکاران"
              tableHeads={["ناو", "پۆل", "خول"]}
              tableContent={data}
            />
          </div>
        </div>
        <div className="w-full lg:w-1/3 p-4">
          <Divider text="خوازراوترین مامۆستاکان" />
          <TopTeachers />
        </div>
      </div>
      <div>
        <Divider text="ئامارەکان" />
        <div className="flex justify-around flex-wrap gap-4 my-4">
          <NumberBox title="ژمارەی خوێندکاران" number={summary_counts?.student_number} />
          <NumberBox title="ژمارەی مامۆستایان" number={summary_counts?.teacher_number} />
          <NumberBox title="ژمارەی خولەکان" number={summary_counts?.course_number} />
          <NumberBox title="پاسی پەیمانگا" number={summary_counts?.bus_users_number} />
        </div>
      </div>
    </div>
  );
}

export default Home;
