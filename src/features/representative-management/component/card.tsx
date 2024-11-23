import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

type Props = {
  name: string;
  email: string;
};

export async function RepresentativeCard({ name, email }: Props) {
  return (
    <Card className="w-[350px] rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 mt-2 ml-2">
      <CardHeader className="bg-gray-50 p-4 text-gray-800 rounded-t-lg text-center">
        <Image
          src="/user.png"
          alt="Representative"
          width={200}
          height={200}
          className="mx-auto"
        />
      </CardHeader>
      <CardContent className="p-6 text-gray-700 text-start">
        <p>{name}</p>
        <p>{email}</p>
      </CardContent>

      <CardFooter className="bg-gray-10 p-4 rounded-b-lg flex justify-center">
        <Button className="w-32">Vote</Button>
      </CardFooter>
    </Card>
  );
}
