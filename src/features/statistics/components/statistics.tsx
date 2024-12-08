import { statsService } from "../instance";
import { ElectionCardConcluded } from "./election-card";

export async function Statistics() {
  const elections = await statsService.getAllElection();

  return (
    <main className="flex h-screen">
      <section className="w-full flex flex-col p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {elections.map((election) => (
            <ElectionCardConcluded
              key={election.id}
              title={election.title}
              time={election.time.toLocaleDateString()}
              name={election.name}
              email={election.email}
              options={election.choices.join(", ")}
              electionWinners={election.winnerChoice}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
