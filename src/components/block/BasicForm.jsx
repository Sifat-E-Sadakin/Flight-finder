"use client";
import React, { useRef } from "react";
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
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
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
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import dateFormat, { masks } from "dateformat";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const flightSchema = z
  .object({
    departure: z.string().min(1, { message: "city is required" }),
    arrival: z.string().min(1, { message: "city is required" }),
    seat: z.coerce
      .number({
        required_error: "Seat is required",
        invalid_type_error: "Seat must be a number",
      })
      .min(1, { message: "Seat must be greater than 0" }),
    dob: z.date({
      required_error: "A date of birth is required.",
    }),
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
      seat: 1,
    },
  });

  const onSubmit = values => {
    let arrival = values.arrival;
    let departure = values.departure;
    let seat = values.seat;
    let dob = dateFormat(values.dob, "isoDateTime");
    let filteredData = data.flightOffer.filter(
      flight =>
        flight.seat[0][0] >= seat &&
        flight.itineraries[0].segments.some(
          segment =>
            segment.departure.iataCode === departure &&
            segment.arrival.iataCode === arrival &&
            segment.departure.at > dob
        )
    );

    console.log(dob);
    setFlightData(filteredData);
    console.log(filteredData);
  };

  let container = useRef();
  useGSAP(() => {
    gsap.to(container.current.children, {
      duration: 1,
      opacity: 1,
      x: 0,
      ease: "power3.inOut",
      stagger: 0.2,
    });
    gsap.to("#submit-btn", {
      duration: 1.5,
      opacity: 1,
      ease: "power3.inOut",
      y: 0,
    });
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          className="flex flex-col md:flex-row gap-5  justify-center"
          ref={container}>
          <FormField
            control={form.control}
            name="departure"
            render={({ field }) => (
              <FormItem className="flex flex-col opacity-5 translate-x-10">
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
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-5 translate-x-100" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search airports..."
                        className="h-9"
                      />
                      <CommandEmpty>No airport found.</CommandEmpty>
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
              <FormItem className="flex flex-col opacity-5 translate-x-10">
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
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-5 translate-x-100" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search airports..."
                        className="h-9"
                      />
                      <CommandEmpty>No airport found.</CommandEmpty>
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
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col opacity-5 translate-x-10">
                <FormLabel>Date of departure</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}>
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-5 translate-x-100" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      // disabled={date =>
                      //   date > new Date() || date < new Date("1900-01-01")
                      // }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="seat"
            render={({ field }) => (
              <FormItem className="opacity-5 translate-x-10">
                <FormLabel>Passenger</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center mt-5">
          <Button
            id="submit-btn"
            className="opacity-0 translate-y-5"
            type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BasicForm;
