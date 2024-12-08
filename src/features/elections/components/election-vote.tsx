import { electionsService } from "../instance";
import { ElectionCard } from "./election-card";

export async function ElectionPage() {
  const elections = await electionsService.getAllElection();

  return (
    <main className="flex h-screen">
      <section className="w-full flex flex-col p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {elections
            .filter((election) => election.status === "ongoing")
            .map((election, id) => (
              <ElectionCard
                key={id}
                title={election.title}
                time={election.createdTimeStamp.toLocaleString()}
                options={election.choices}
                electionId={election.id}
              />
            ))}
        </div>
      </section>
    </main>
  );
}
