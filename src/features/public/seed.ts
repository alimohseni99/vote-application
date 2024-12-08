import { publicService } from "./instance";
export async function seedPublicTable() {
  for (let i = 0; i < 20; i++) {
    await publicService.createPublicVoter();
  }
}

