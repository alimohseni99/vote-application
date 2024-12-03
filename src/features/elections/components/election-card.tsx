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
import { useState } from "react";
import { addPublicPreference, addRepresentativeVote } from "../action";

type Props = {
  title: string;
  time: Date;
  options: string[];
  electionId: string;
};

export function ElectionCard({ title, time, options, electionId }: Props) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const onClickRepresentative = () => {
    if (selectedOption) {
      addRepresentativeVote(electionId, selectedOption);
      alert("Thank you for voting");
    } else {
      alert("Please select an option before voting.");
    }
  };

  const onClickPublic = () => {
    if (selectedOption) {
      addPublicPreference(electionId, selectedOption);
      alert("Thank you for choosing a preference");
    } else {
      alert("Please select an option before choosing.");
    }
  };

  return (
    <Card className="!w-[350px] p-6 shadow-md rounded-lg mx-auto border">
      <CardHeader>
        <CardTitle>
          <strong>Title: </strong>: {title}
        </CardTitle>
        <CardDescription>
          <p>Time: {time.toLocaleString()}</p>
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
        <Button onClick={onClickRepresentative} className="w-full">
          Submit vote
        </Button>
      </CardFooter>
      <CardFooter className="flex justify-center ">
        <Button onClick={onClickPublic} className="w-full">
          Submit preference
        </Button>
      </CardFooter>
    </Card>
  );
}
