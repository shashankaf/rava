import AccountingBox from "@/components/dashboard/AccountingBox";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import localFont from "next/font/local";
import { supabase } from "@/utils/supabase/client";
import StudentTable from "@/components/dashboard/StudentTable";
import TopTeachers from "@/components/dashboard/TopTeachers";
import Divider from "@/components/Divider";
import NumberBox from "@/components/dashboard/NumberBox";

const bbc = localFont({ src: "../sarkar_bbc.ttf" });
const rudaw = localFont({ src: "../rudaw.ttf" });

async function Home() {
  const { error, data } = await supabase
    .from("student")
    .select(`*, course(*), class(*)`)
    .limit(10)
    .order("created_at", { ascending: false });
  if (error) {
    throw Error;
  }
  return (
    <div dir="rtl" className={`${bbc.className} w-full mt-16`}>
      <Divider text="داهات و خەرجی" />
      <div className="flex justify-between w-full flex-wrap">
        <AccountingBox text="داهات" money={"317"} color="bg-purple-700">
          <FaMoneyBill1Wave />
        </AccountingBox>
        <AccountingBox text="خەرجی" money={"228"} color="bg-indigo-700">
          <FaMoneyBillTrendUp />
        </AccountingBox>
        <AccountingBox text="دەستمایە" money={"122"} color="bg-pink-700">
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
          <NumberBox title="ژمارەی خوێندکاران" number={13} />
          <NumberBox title="ژمارەی مامۆستایان" number={11} />
          <NumberBox title="ژمارەی خولەکان" number={9} />
          <NumberBox title="پاسی پەیمانگا" number={8} />
        </div>
      </div>
    </div>
  );
}

export default Home;
