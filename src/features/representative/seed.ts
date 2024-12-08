import { faker } from "@faker-js/faker";
import { representativesService } from "./instance";
import { representativeTableInsert } from "./schema/schema";

export async function representativeTableSeed() {
  for (let i = 0; i < 10; i++) {
    const representative: representativeTableInsert = {
      id: faker.string.uuid(),
      name: faker.person.firstName() + " " + faker.person.lastName(),
      email: faker.internet.email(),
    };

    await representativesService.addRepresentative(representative);
  }
}
