import {
  electionPreferenceTable,
  electionPreferenceTableInsert,
  electionTable,
  electionTableInsert,
  electionVoteTable,
  electionVoteTableInsert,
} from "@/features/elections/schema/schema";
import { publicVotersTable } from "@/features/public/schema/schema";
import { faker } from "@faker-js/faker";
import { db } from ".";
import {
  representativeTable,
  representativeTableInsert,
  representativeVotesTable,
  representativeVotesTableInsert,
} from "../features/representative/schema/schema";

const voterSeed = async () => {
  const publicVoters: { id: string }[] = [];
  const representatives: representativeTableInsert[] = [];
  const representativeVotes: representativeVotesTableInsert[] = [];

  for (let i = 0; i < 30; i++) {
    publicVoters.push({
      id: faker.string.uuid(),
    });
  }

  for (let i = 0; i < 10; i++) {
    representatives.push({
      id: faker.string.uuid(),
      name: faker.person.firstName() + " " + faker.person.lastName(),
      email: faker.internet.email(),
    });
  }

  publicVoters.forEach((voter) => {
    const randomRepresentative =
      representatives[Math.floor(Math.random() * representatives.length)];

    representativeVotes.push({
      id: faker.string.uuid(),
      representativeId: randomRepresentative.id!,
      publicVoterId: voter.id,
    });
  });

  publicVoters.push({
    id: "c7a1ed89-68db-4c4f-8e5b-d3182bfa5c5d",
  });

  representatives.push({
    id: "45902ca6-657b-4e7a-b630-74a967e4abfd",
    name: "Ali Mohseni",
    email: "ali.mohseni05@yahoo.se",
  });
  await db.insert(publicVotersTable).values(publicVoters).execute();
  await db.insert(representativeTable).values(representatives).execute();
  await db
    .insert(representativeVotesTable)
    .values(representativeVotes)
    .execute();
};

const electionSeed = async () => {
  const elections: electionTableInsert[] = [];
  const publicVoters = await db.select().from(publicVotersTable).execute();
  const publicVoterPreferences: electionPreferenceTableInsert[] = [];
  const representatives = await db.select().from(representativeTable).execute();
  const electionVoteRepresentative: electionVoteTableInsert[] = [];

  for (let i = 0; i < 2; i++) {
    elections.push({
      id: faker.string.uuid(),
      title: faker.lorem.word(3),
      createdTimeStamp: faker.date.recent(),
      status: "ongoing",
      choices: ["Apple", "Orange", "Banana"],
    });
  }

  await db.insert(electionTable).values(elections).execute();

  publicVoters.forEach((voter) => {
    const randomElection =
      elections[Math.floor(Math.random() * elections.length)];
    const randomChoice =
      randomElection.choices[
        Math.floor(Math.random() * randomElection.choices.length)
      ];

    const randomRepresentative =
      representatives[Math.floor(Math.random() * representatives.length)];

    publicVoterPreferences.push({
      id: faker.string.uuid(),
      electionId: randomElection.id!,
      preference: randomChoice,
      voterId: voter.id,
    });
    electionVoteRepresentative.push({
      id: faker.string.uuid(),
      electionId: randomElection.id!,
      choice: randomChoice,
      representativeId: randomRepresentative.id,
      totalVotes: Math.floor(Math.random() * publicVoters.length),  
    });
  });

  await db
    .insert(electionVoteTable)
    .values(electionVoteRepresentative)
    .execute();

  await db
    .insert(electionPreferenceTable)
    .values(publicVoterPreferences)
    .execute();
};

voterSeed()
  .then(() => {
    console.log(
      "Seeded public voters, representatives, and representative votes tables"
    );
    return electionSeed();
  })
  .then(() => {
    console.log("Seeded election table and public voter preferences table");
  })
  .catch((error) => {
    console.error("An error occurred during seeding:", error);
  });
