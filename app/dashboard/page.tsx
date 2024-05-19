import AccountingBox from "@/components/dashboard/AccountingBox";

async function Home() {
  return (
    <div className="flex-1 w-full min-h-screen flex flex-col gap-20 items-center">
      <div className="animate-in flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <AccountingBox />
        </main>
      </div>
    </div>
  );
}

export default Home;
