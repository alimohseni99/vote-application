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
import { useForm } from "react-hook-form";
import { addRepresentative } from "../action";

export function RepresentativeForm() {
  const form = useForm();

  return (
    <Form {...form}>
      <form
        action={addRepresentative}
        className="space-y-6 p-6 shadow-md rounded-lg max-w-md mx-auto border"
      >
        <h2 className="text-xl font-semibold text-center">
          Add Representative
        </h2>

        <FormItem>
          <FormLabel className="text-sm font-medium">Name</FormLabel>
          <FormControl>
            <Input
              name="name"
              placeholder="Enter representative name"
              className="mt-1 block w-full rounded-md border shadow-sm"
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel className="text-sm font-medium">Email</FormLabel>
          <FormControl>
            <Input
              name="email"
              type="email"
              placeholder="Enter representative email"
              className="mt-1 block w-full rounded-md border shadow-sm"
            />
          </FormControl>
          <FormMessage />
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
