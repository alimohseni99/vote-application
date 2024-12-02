import { electionService } from "../instance";
import { ElectionCard } from "./election-card";

export async function ElectionPage() {
  const elections = await electionService.getAllElection();

  const combinedArray = elections.map(({ election, election_choices }) => ({
    ...election,
    createdTimeStamp: new Date(election.createdTimeStamp).toISOString(),
    choiceId: election_choices?.id ?? null,
    choice: election_choices?.choice ?? null,
  }));
  return (
    <div className="flex">
      {combinedArray.map((election, id) => (
        <ElectionCard
          key={id}
          title={election.id}
          time={election.createdTimeStamp}
          options={election.choice}
        />
      ))}
    </div>
  );
}
