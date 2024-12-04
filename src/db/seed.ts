import { faker } from "@faker-js/faker";
import { db } from ".";
import { representativeVotesTable } from "../features/representative/schema/schema";
import { publicVotersTable } from "./../features/public/schema/schema";
/*
const representativeSeed = async () => {
  const representative: (typeof representativeTable.$inferInsert)[] = [];

  for (let i = 0; i < 10; i++) {
    representative.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      publicVotes: faker.number.int({ min: 1, max: 1000 }),
    });
  }
  representative.push({
    id: "45902ca6-657b-4e7a-b630-74a967e4abfd",
    name: "Ali Mohseni",
    email: "ali.mohseni05@yahoo.se",
  });

  await db.insert(representativeTable).values(representative);
};

representativeSeed().then(() => console.log("seeded representative table"));

const electionSeed = async () => {
  const election: (typeof electionTable.$inferInsert)[] = [];

  for (let i = 0; i < 10; i++) {
    election.push({
      title: faker.lorem.words(),
      choice: [faker.lorem.words(), faker.lorem.words(), faker.lorem.words()],
    });
  }

  await db.insert(electionTable).values(election).execute();
};
electionSeed().then(() => console.log("seeded election table"));
*/

const publicVotersSeed = async () => {
  //seed publicVoters
  const publicVoter: (typeof publicVotersTable.$inferInsert)[] = [];

  //seed representativeVotes
  const representativeVotes: (typeof representativeVotesTable.$inferInsert)[] =
    [];

  for (let i = 0; i < 5; i++) {
    publicVoter.push({
      id: faker.string.uuid(),
    });
  }

  publicVoter.forEach((voter) => {
    representativeVotes.push({
      id: faker.string.uuid(),
      representativeId: faker.string.uuid(),
      publicVoterId: voter.id!,
    });
  });

  //Default public voter, Don't remove it
  publicVoter.push({
    id: "c7a1ed89-68db-4c4f-8e5b-d3182bfa5c5d",
  });

  await db.insert(publicVotersTable).values(publicVoter).execute();
  await db
    .insert(representativeVotesTable)
    .values(representativeVotes)
    .execute();
};

publicVotersSeed().then(() => console.log("seeded public-voter table"));
