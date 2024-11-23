import { chatService } from "../instance";
import { RepresentativeCard } from "./card";
import { LeaderBoard } from "./leaderboard";

export async function Main() {
  const representatives = await chatService.getAllRepresentatives();

  return (
    <>
      <main className="grid grid-cols-5 gap-2">
        <section className="grid grid-cols-3 gap-2 col-span-3">
          {representatives.map((representative, index) => (
            <RepresentativeCard
              key={index}
              name={representative.name}
              email={representative.email}
            />
          ))}
        </section>

        <div className="col-span-2 justify-center text-center m-4">
          <LeaderBoard />
        </div>
      </main>
    </>
  );
}
