"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import Image from "next/image";
import { AddPublicVote } from "../action";

type Props = {
  name: string;
  email: string;
  votes: number;
  representativeId: string;
};

export function RepresentativeCard({
  name,
  email,
  votes,
  representativeId,
}: Props) {
  const onClick = async () => {
    try {
      await AddPublicVote(representativeId);
      alert("Thank you for your vote");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unexpected error happened");
      }
    }
  };

  return (
    <Card className="w-full max-w-sm rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 mt-2 ml-2">
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
        <p>
          <strong>Name: </strong> {name}
        </p>
        <p>
          <strong>Email: </strong> {email}
        </p>
        <p>
          <strong>Total of votes: </strong>
          {votes}
        </p>
      </CardContent>

      <CardFooter className="bg-gray-10 p-4 rounded-b-lg flex justify-center">
        <Button className="w-32" onClick={onClick}>
          Vote
        </Button>
      </CardFooter>
    </Card>
  );
}
