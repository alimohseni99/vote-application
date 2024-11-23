import { chatService } from "../instance";
import { RepresentativeCard } from "./card";
import { LeaderBoard } from "./leaderboard";

export async function Main() {
  const representatives = await chatService.getAllRepresentatives();
  return (
    <>
      <main className="grid grid-cols-5 ">
        <section className="grid grid-cols-3 col-span-3">
          {representatives.map((representative, id) => (
            <RepresentativeCard
              key={id}
              name={representative.name}
              email={representative.email}
              votes={representative.votes}
              representativeId={representative.id}
            />
          ))}
        </section>

        <div className="col-span-2 justify-center text-center">
          <LeaderBoard />
        </div>
      </main>
    </>
  );
}
