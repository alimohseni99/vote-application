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
      <form action={addRepresentative} className="space-y-8">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input name="name" />
          </FormControl>{" "}
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input name="email" />
          </FormControl>
          <FormMessage />
        </FormItem>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
