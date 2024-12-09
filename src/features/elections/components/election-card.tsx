"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  addPublicPreferenceAction,
  addRepresentativeVoteAction,
  concludeElectionAction,
} from "../action";

import { AlertDialogDemo } from "./alert-dialog";

type Props = {
  title: string;
  time: string;
  options: string[];
  electionId: string;
};

export function ElectionCard({ title, time, options, electionId }: Props) {
  const { toast } = useToast();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const onClickRepresentative = () => {
    if (!selectedOption) {
      toast({
        description: "Please select an option before submitting.",
      });
    } else {
      addRepresentativeVoteAction(electionId, selectedOption);
      toast({
        description: "Thank you for voting!",
      });
    }
  };

  const onClickPublic = () => {
    if (!selectedOption) {
      toast({
        description: "Please select an option before submitting.",
      });
    } else {
      addPublicPreferenceAction(electionId, selectedOption);
      toast({
        description: "Thank you for choosing a preference",
      });
    }
  };

  const onClickToConclude = () => {
    concludeElectionAction(electionId, title, new Date(time));
    toast({
      description: "The election has been concluded",
    });
  };
  return (
    <Card className="w-full max-w-sm rounded-lg shadow-lg border border-gray-200 ">
      <CardHeader>
        <CardTitle>
          <strong>Title: </strong>: {title}
        </CardTitle>
        <CardDescription>
          <p>Time: {time}</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Select onValueChange={(value) => setSelectedOption(value)}>
          <SelectTrigger id="framework">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            {Array.isArray(options) &&
              options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </CardContent>
      <CardFooter className="flex justify-center">
        <AlertDialogDemo
          description={
            "This will register your vote and you will not be able to change it."
          }
          onConfirm={onClickRepresentative}
        >
          <Button className="w-full">Submit vote</Button>
        </AlertDialogDemo>
      </CardFooter>
      <CardFooter className="flex justify-center ">
        <AlertDialogDemo
          description={
            "This will assign this choice as your preference in the upcoming election."
          }
          onConfirm={onClickPublic}
        >
          <Button className="w-full">Submit preference</Button>
        </AlertDialogDemo>
      </CardFooter>
      <CardFooter className="flex justify-center ">
        <AlertDialogDemo
          description={
            "This will conclude the election and you can view the results in the statistic section."
          }
          onConfirm={onClickToConclude}
        >
          <Button className="w-full">Conclude Elections</Button>
        </AlertDialogDemo>
      </CardFooter>
    </Card>
  );
}
