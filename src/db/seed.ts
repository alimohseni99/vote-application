import { electionTable } from "@/features/elections/schema/schema";
import { faker } from "@faker-js/faker";
import { db } from ".";
import { representativeTable } from "../features/representative/schema/schema";
const representativeSeed = async () => {
  const representative: (typeof representativeTable.$inferInsert)[] = [];

  for (let i = 0; i < 10; i++) {
    representative.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      publicVotes: faker.number.int({ min: 10, max: 100 }),
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
