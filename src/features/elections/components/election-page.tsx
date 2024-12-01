import { electionService } from "../instance";
import { ElectionCard } from "./election-card";

export async function ElectionPage() {
  const elections = await electionService.getAllElection();

  console.log(elections);
  return (
    <div className="flex">
      {elections.map((election, id) => (
        <ElectionCard
          key={id}
          title={election.election.title}
          time={election.election.createdTimeStamp}
          options={election.election_choices.choice}
        />
      ))}
    </div>
  );
}
