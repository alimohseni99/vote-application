import { faker } from "@faker-js/faker";
import { db } from "../../../db";
import { electionTable } from "./schema";
const main = async () => {
  const election: (typeof electionTable.$inferInsert)[] = [];

  for (let i = 0; i < 10; i++) {
    election.push({
      title: faker.lorem.words(),
      choice: [faker.lorem.words(), faker.lorem.words(), faker.lorem.words()],
    });
  }

  await db.insert(electionTable).values(election).execute();
};

main().then(() => console.log("seeded election table"));
