import { checkForDuplicateVote } from "../action";
import { chatService } from "../instance";
import { RepresentativeCard } from "./card";
import { LeaderBoard } from "./leaderboard";
export async function Main() {
  const representatives = await chatService.getAllRepresentatives();

  const userHasVotedForRepresentatives = await Promise.all(
    representatives.map(async (representative) => {
      const hasVoted = await checkForDuplicateVote(representative.id);
      return { ...representative, hasVoted };
    })
  );

  return (
    <main className="grid grid-cols-5 ">
      <section className="grid grid-cols-3 col-span-3">
        {userHasVotedForRepresentatives.map((representative, id) => (
          <RepresentativeCard
            key={id}
            name={representative.name}
            email={representative.email}
            votes={representative.votes}
            representativeId={representative.id}
            disabled={representative.hasVoted}
          />
        ))}
      </section>

      <div className="col-span-2 justify-center text-center">
        <LeaderBoard />
      </div>
    </main>
  );
}
