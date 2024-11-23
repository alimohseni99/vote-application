import { chatService } from "./instance";
import { Representative } from "./type";
export async function addRepresentative(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (!name || !email) {
    return;
  }
  const representative: Representative = {
    name,
    email,
  };
  await chatService.addRepresentative(representative);
}
