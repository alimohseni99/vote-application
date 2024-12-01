import { representativeService } from "../instance";
import { RepresentativeCard } from "./card";

export async function Main() {
  const representatives = await representativeService.getAllRepresentatives();

  return (
    <main className="flex h-screen">
      <section className="w-screen flex flex-col p-10">
        <div className="grid grid-cols-5">
          {representatives.map((representative, id) => (
            <RepresentativeCard
              key={id}
              name={representative.name}
              email={representative.email}
              votes={representative.publicVotes}
              representativeId={representative.id}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
