"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const flightSchema = z.object({
  departure: z.string().min(1, { message: "Departure is required" }),
  arrival: z.string().min(1, { message: "Arrival is required" }),
});

const BasicForm = () => {
  const form = useForm({
    resolver: zodResolver(flightSchema),
    defaultValues: {
      departure: "",
      arrival: "",
    },
  });

  const onSubmit = values => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" ">
        <div className="flex gap-5 items-center justify-center">
          <FormField
            control={form.control}
            name="departure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Departure</FormLabel>
                <FormControl>
                  <Input placeholder="Departure From" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="arrival"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Arrival</FormLabel>
                <FormControl>
                  <Input placeholder="Arrival To" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center my-5">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default BasicForm;
