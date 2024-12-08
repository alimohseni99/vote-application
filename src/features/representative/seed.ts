import { faker } from "@faker-js/faker";
import { representativesService } from "./instance";
import { representativeTableInsert } from "./schema/schema";

export async function seedRepresentativeTable() {
  for (let i = 0; i < 10; i++) {
    const representative: representativeTableInsert = {
      id: faker.string.uuid(),
      name: faker.person.firstName() + " " + faker.person.lastName(),
      email: faker.internet.email(),
    };

    await representativesService.addRepresentativeAction(representative);
  }
}

export async function seedRepresentativeVotesTable() {
  const publicVoters = await representativesService.getPublicVoterData();

  for (const voter of publicVoters) {
    const representatives =
      await representativesService.getAllRepresentatives();
    const randomRepresentative =
      representatives[Math.floor(Math.random() * representatives.length)];

    await representativesService.addPublicVote(
      randomRepresentative.id,
      voter.id
    );
  }
}

export async function seedDefaultRepresentative() {
  await representativesService.addRepresentativeAction({
    id: "45902ca6-657b-4e7a-b630-74a967e4abfd",
    name: "Ali Mohseni",
    email: "ali.mohseni05@yahoo.se",
  });
}
