import { faker } from "@faker-js/faker";
import { db } from "../../../db";
import { representativeTable } from "./schema";
const main = async () => {
  const representative: (typeof representativeTable.$inferInsert)[] = [];

  for (let i = 0; i < 10; i++) {
    representative.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      publicVotes: faker.number.int({ min: 10, max: 100 }),
    });
  }

  await db.insert(representativeTable).values(representative);
};

main().then(() => console.log("seeded representative table"));
