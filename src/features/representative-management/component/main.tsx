import { chatService } from "../instance";
import { RepresentativeCard } from "./card";

export async function Main() {
  const representatives = await chatService.getAllRepresentatives();

  return (
    <>
      <main>
        {representatives.map((representatives, index) => (
          <div key={index}>
            <RepresentativeCard
              name={representatives.name}
              email={representatives.email}
            />
          </div>
        ))}
      </main>
    </>
  );
}
