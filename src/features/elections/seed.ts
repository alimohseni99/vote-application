import { faker } from "@faker-js/faker";
import { electionsService } from "./instance";
import {
  electionPreferenceTableInsert,
  electionTableInsert,
} from "./schema/schema";

export async function seedElectionTable() {
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
export async function seedElectionPreferenceTable() {
  const publicVoters = await electionsService.getPublicVoterData();
  const elections = await electionsService.getAllElection();

  const publicVoterPreferences: electionPreferenceTableInsert[] = [];
  const existingPreferences = new Set<string>();

  for (const voter of publicVoters) {
    const randomElection =
      elections[Math.floor(Math.random() * elections.length)];

    const uniqueKey = `${voter.id}-${randomElection.id}`;
    if (existingPreferences.has(uniqueKey)) {
      continue;
    }
    existingPreferences.add(uniqueKey);

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

  if (publicVoterPreferences.length > 0) {
    for (const preference of publicVoterPreferences) {
      await electionsService.addPublicPreference(preference);
    }
  }
}

export async function seedElectionVoteTable() {
  const representatives = await electionsService.getAllRepresentatives();
  const elections = await electionsService.getAllElection();

  const electionVoteRepresentative = [];
  for (const election of elections) {
    for (const representative of representatives) {
      electionVoteRepresentative.push({
        id: faker.string.uuid(),
        electionId: election.id!,
        choice:
          election.choices[Math.floor(Math.random() * election.choices.length)],
        representativeId: representative.id,
      });
    }
  }
  for (const vote of electionVoteRepresentative) {
    await electionsService.addRepresentativeVote(vote);
  }
}
