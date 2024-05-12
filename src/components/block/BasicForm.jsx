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
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { uniqueCities } from "@/utiles/getData";
import data from "../../../public/data/data.json";
const flightSchema = z
  .object({
    departure: z.string().min(1, { message: "city is required" }),
    arrival: z.string().min(1, { message: "city is required" }),
  })
  .refine(data => data.departure !== data.arrival, {
    path: ["arrival"],
    message: "Departure and Arrival city should not be same",
  });

const BasicForm = ({ flightData, setFlightData }) => {
  // console.log(uniqueCities);
  const cities = uniqueCities.map(city => {
    return {
      label: city,
      value: city,
    };
  });

  const form = useForm({
    resolver: zodResolver(flightSchema),
    defaultValues: {
      departure: "",
      arrival: "",
    },
  });

  const onSubmit = values => {
    let arrival = values.arrival;
    let departure = values.departure;
    let filteredData = data.flightOffer.filter(flight =>
      flight.itineraries[0].segments.some(
        segment =>
          segment.departure.iataCode === departure &&
          segment.arrival.iataCode === arrival
      )
    );
    console.log(filteredData);
    setFlightData(filteredData);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-5 items-center justify-center">
          <FormField
            control={form.control}
            name="departure"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Departure</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}>
                        {field.value
                          ? cities.find(city => city.value === field.value)
                              ?.label
                          : "Select city"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search framework..."
                        className="h-9"
                      />
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {cities.map(city => (
                          <CommandItem
                            value={city.label}
                            key={city.value}
                            onSelect={() => {
                              form.setValue("departure", city.value);
                            }}>
                            {city.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                city.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="arrival"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Arrival</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}>
                        {field.value
                          ? cities.find(city => city.value === field.value)
                              ?.label
                          : "Select city"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search framework..."
                        className="h-9"
                      />
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {cities.map(city => (
                          <CommandItem
                            value={city.label}
                            key={city.value}
                            onSelect={() => {
                              form.setValue("arrival", city.value);
                            }}>
                            {city.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                city.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center mt-5">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default BasicForm;
