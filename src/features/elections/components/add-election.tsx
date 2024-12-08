"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addElectionAction } from "../action";

const electionSchema = z.object({
  title: z.string().min(1, "This field is required"),
  optionA: z.string().min(1, "This field is required"),
  optionB: z.string().min(1, "This field is required"),
  optionC: z.string().min(1, "This field is required"),
  optionD: z.string().min(1, "This field is required"),
});

export function Election() {
  const form = useForm<z.infer<typeof electionSchema>>({
    resolver: zodResolver(electionSchema),
    defaultValues: {
      title: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
    },
  });

  const onSubmit = (values: z.infer<typeof electionSchema>) => {
    const election = {
      title: values.title,
      choices: [values.optionA, values.optionB, values.optionC, values.optionD],
    };

    addElectionAction(election);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-6 shadow-md rounded-lg max-w-md mx-auto border mt-20"
      >
        <h2 className="text-xl font-semibold text-center">
          Create an Election
        </h2>

        <FormItem>
          <FormLabel className="text-sm font-medium">Election Title</FormLabel>
          <FormControl>
            <Input
              {...form.register("title")}
              placeholder="Enter Election title"
              className="mt-1 block w-full rounded-md border shadow-sm"
            />
          </FormControl>
          <FormMessage>{form.formState.errors.optionA?.message}</FormMessage>
        </FormItem>

        <FormItem>
          <FormLabel className="text-sm font-medium">Option A</FormLabel>
          <FormControl>
            <Input
              {...form.register("optionA")}
              placeholder="Enter option A"
              className="mt-1 block w-full rounded-md border shadow-sm"
            />
          </FormControl>
          <FormMessage>{form.formState.errors.optionA?.message}</FormMessage>
        </FormItem>

        <FormItem>
          <FormLabel className="text-sm font-medium">Option B</FormLabel>
          <FormControl>
            <Input
              {...form.register("optionB")}
              placeholder="Enter option B"
              className="mt-1 block w-full rounded-md border shadow-sm"
            />
          </FormControl>
          <FormMessage>{form.formState.errors.optionB?.message}</FormMessage>
        </FormItem>

        <FormItem>
          <FormLabel className="text-sm font-medium">Option C</FormLabel>
          <FormControl>
            <Input
              {...form.register("optionC")}
              placeholder="Enter option C"
              className="mt-1 block w-full rounded-md border shadow-sm"
            />
          </FormControl>
          <FormMessage>{form.formState.errors.optionB?.message}</FormMessage>
        </FormItem>

        <FormItem>
          <FormLabel className="text-sm font-medium">Option D</FormLabel>
          <FormControl>
            <Input
              {...form.register("optionD")}
              placeholder="Enter option D"
              className="mt-1 block w-full rounded-md border shadow-sm"
            />
          </FormControl>
          <FormMessage>{form.formState.errors.optionB?.message}</FormMessage>
        </FormItem>
        <div className="text-center">
          <Button type="submit" className="w-full py-2 px-4 rounded-lg">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
