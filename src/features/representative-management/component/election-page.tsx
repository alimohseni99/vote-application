import { chatService } from "../instance";
import { ElectionCard } from "./election-card";

export async function ElectionPage() {
  const elections = await chatService.getAllElection();
  console.log(elections);

  return (
    <div className="flex">
      {elections.map((election, id) => (
        <ElectionCard
          key={id}
          title={election.title}
          time={election.createdTimeStamp}
          options={election.optionText}
        />
      ))}
    </div>
  );
}
