import { faker } from "@faker-js/faker";
import { publicService } from "./instance";
export async function seedPublicTable() {
  for (let i = 0; i < 50; i++) {
    const publicVoter = {
      id: faker.string.uuid(),
    };
    await publicService.addPublicVoterById(publicVoter.id);
  }
}

export function seedPublicTableWithDefaultId() {
  return publicService.addPublicVoterById(
    "c7a1ed89-68db-4c4f-8e5b-d3182bfa5c5d"
  );
}
