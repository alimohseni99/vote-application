import { representativeService } from "../instance";
import { RepresentativeCard } from "./representative-card";

export async function RepresentativeVotePage() {
  const representatives = await representativeService.getAllRepresentatives();

  return (
    <main className="flex h-screen">
      <section className="w-full flex flex-col p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {representatives.map((representative, id) => (
            <RepresentativeCard
              key={id}
              name={representative.name}
              email={representative.email}
              votes={representative.totalVotes}
              representativeId={representative.id}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
