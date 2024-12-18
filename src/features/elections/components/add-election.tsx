"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addElectionAction } from "../action";
import { electionSchema } from "../validation";

export function Election() {
  const form = useForm<z.infer<typeof electionSchema>>({
    resolver: zodResolver(electionSchema),
    defaultValues: {
      title: "",
      choices: ["", "", "", ""],
    },
  });

  const onSubmit = (values: z.infer<typeof electionSchema>) => {
    addElectionAction(values);
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
          <FormMessage>{form.formState.errors.title?.message}</FormMessage>
        </FormItem>

        <FormItem>
          <FormLabel className="text-sm font-medium">Option A</FormLabel>
          <FormControl>
            <Input
              {...form.register("choices.0")}
              placeholder="Enter option A"
              className="mt-1 block w-full rounded-md border shadow-sm"
            />
          </FormControl>
          <FormMessage>
            {form.formState.errors.choices?.[0]?.message}
          </FormMessage>
        </FormItem>

        <FormItem>
          <FormLabel className="text-sm font-medium">Option B</FormLabel>
          <FormControl>
            <Input
              {...form.register("choices.1")}
              placeholder="Enter option B"
              className="mt-1 block w-full rounded-md border shadow-sm"
            />
          </FormControl>
          <FormMessage>
            {form.formState.errors.choices?.[1]?.message}
          </FormMessage>
        </FormItem>

        <FormItem>
          <FormLabel className="text-sm font-medium">Option C</FormLabel>
          <FormControl>
            <Input
              {...form.register("choices.2")}
              placeholder="Enter option C"
              className="mt-1 block w-full rounded-md border shadow-sm"
            />
          </FormControl>
          <FormMessage>
            {form.formState.errors.choices?.[2]?.message}
          </FormMessage>
        </FormItem>

        <FormItem>
          <FormLabel className="text-sm font-medium">Option D</FormLabel>
          <FormControl>
            <Input
              {...form.register("choices.3")}
              placeholder="Enter option D"
              className="mt-1 block w-full rounded-md border shadow-sm"
            />
          </FormControl>
          <FormMessage>
            {form.formState.errors.choices?.[3]?.message}
          </FormMessage>
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
