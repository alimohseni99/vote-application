import { statsService } from "../instance";
import { ElectionCardConcluded } from "./election-card";

export async function Statistics() {
  const elections = await statsService.getAllElection();
  const electionWinners = await statsService.getElectionWinner();
  electionWinners.forEach(
    (winner: {
      id: string;
      choice: string;
      electionId: string;
      representativeId: string;
      totalVotes: string | null;
    }) => {
      console.log(winner.choice);
    }
  );
  return (
    <main className="flex h-screen">
      <section className="w-full flex flex-col p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {elections
            .filter((election) => election.status === "concluded")
            .map((election, id) => (
              <ElectionCardConcluded
                key={id}
                title={election.title}
                time={
                  election.createdTimeStamp
                    .toISOString()
                    .replace("T", " ")
                    .replace("Z", "")
                    .split(".")[0]
                }
                name={"choice"}
                email={""}
                options={election.choice.join(", ")}
              />
            ))}
        </div>
      </section>
    </main>
  );
}
