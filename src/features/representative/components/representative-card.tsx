"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { AddPublicVoteAction } from "../action";
import { AlertDialogDemo } from "./alert-dialog";

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
  const { toast } = useToast();

  const onClick = async () => {
    try {
      await AddPublicVoteAction(representativeId);
      toast({
        description: "Thank you!",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          description: `${error.message}`,
        });
      }
    }
  };

  return (
    <Card className="w-full max-w-sm rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 mt-2 ml-2">
      <CardHeader className="bg-gray-50 p-4 text-gray-800 rounded-t-lg text-center">
        <Image
          src="/public/user.png"
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
        <AlertDialogDemo
          description={
            "You will be assigning this representative to vote on your behalf on elections."
          }
          onConfirm={onClick}
        >
          <Button className="w-full">Assign Representative</Button>
        </AlertDialogDemo>
      </CardFooter>
    </Card>
  );
}
