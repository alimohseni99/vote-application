import { faker } from "@faker-js/faker";
import { electionsService } from "./instance";
import { electionTableInsert } from "./schema/schema";

export async function electionTableSeed() {
  for (let i = 0; i < 5; i++) {
    const election: electionTableInsert = {
      id: faker.string.uuid(),
      title: faker.lorem.word(3),
      createdTimeStamp: faker.date.recent(),
      status: "ongoing",
      choices: ["Apple", "Orange", "Banana"],
    };

    await electionsService.addElection(election);
  }
}
export async function electionPreferenceTableSeed() {
  const publicVoters = await electionsService.getPublicVoterData();
  const elections = await electionsService.getAllElection();

  const publicVoterPreferences = [];
  for (const voter of publicVoters) {
    const randomElection =
      elections[Math.floor(Math.random() * elections.length)];
    const randomChoice =
      randomElection.choices[
        Math.floor(Math.random() * randomElection.choices.length)
      ];

    publicVoterPreferences.push({
      id: faker.string.uuid(),
      electionId: randomElection.id!,
      preference: randomChoice,
      voterId: voter.id,
    });
  }

  for (const preference of publicVoterPreferences) {
    await electionsService.addPublicPreference(preference);
  }
}
