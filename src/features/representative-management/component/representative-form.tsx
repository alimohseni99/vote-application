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
import { addRepresentative } from "../action";

const representativeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email({ message: "Invalid email address" }),
});

export function RepresentativeForm() {
  const form = useForm<z.infer<typeof representativeSchema>>({
    resolver: zodResolver(representativeSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof representativeSchema>) => {
    addRepresentative(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-6 shadow-md rounded-lg max-w-md mx-auto border"
      >
        <h2 className="text-xl font-semibold text-center">
          Add Representative
        </h2>

        <FormItem>
          <FormLabel className="text-sm font-medium">Name</FormLabel>
          <FormControl>
            <Input
              {...form.register("name")}
              placeholder="Enter representative name"
              className="mt-1 block w-full rounded-md border shadow-sm"
            />
          </FormControl>
          <FormMessage>{form.formState.errors.name?.message}</FormMessage>
        </FormItem>

        <FormItem>
          <FormLabel className="text-sm font-medium">Email</FormLabel>
          <FormControl>
            <Input
              {...form.register("email")}
              type="email"
              placeholder="Enter representative email"
              className="mt-1 block w-full rounded-md border shadow-sm"
            />
          </FormControl>
          <FormMessage>{form.formState.errors.email?.message}</FormMessage>
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
