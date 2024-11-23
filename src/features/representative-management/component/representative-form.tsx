"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
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
        <FormField
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="" name="name" />
              </FormControl>{" "}
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" name="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
