import { electionService } from "../instance";
import { ElectionCard } from "./election-card";

export async function ElectionPage() {
  const elections = await electionService.getAllElection();
  return (
    <main className="flex h-screen">
      <section className="w-screen flex flex-col p-10">
        <div className="grid grid-cols-5 gap-5">
          {elections.map((election, id) => (
            <ElectionCard
              key={id}
              title={election.title}
              time={election.createdTimeStamp}
              options={election.choice}
              electionId={election.id}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
