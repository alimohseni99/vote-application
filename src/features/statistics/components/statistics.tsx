import { statsService } from "../instance";

export async function Statistics() {
  const elections = await statsService.getAllElection();
  console.log(elections);
  return (
    <main className="flex h-screen">
      <section className="w-full flex flex-col p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"></div>
      </section>
    </main>
  );
}
