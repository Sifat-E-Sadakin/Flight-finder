import React, { useRef } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const BasicList = ({ flightData }) => {
  let container = useRef();
  useGSAP(() => {
    gsap.to(container.current.children, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.2,
      delay: 0.8,
      ease: "power3.inOut",
    });
  });

  return (
    <div>
      <Table className="">
        <TableHeader className="whitespace-nowrap bg-white">
          <TableRow className="text-black">
            <TableHead className="w-[100px] text-black rounded-s-[5px]">
              Flight Number
            </TableHead>
            <TableHead className="text-black">Departure City</TableHead>
            <TableHead className="text-black">Departure Time</TableHead>
            <TableHead className="text-black">Arrival City</TableHead>
            <TableHead className="text-black">Arrival Time</TableHead>
            <TableHead className="text-black">Flight Time</TableHead>
            <TableHead className="text-black">Available Seat</TableHead>
            <TableHead className="text-right text-black rounded-e-[5px]">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody ref={container} className="text-black">
          {flightData.map((flight, index) => (
            <>
              <TableRow key={index} className="opacity-0 translate-y-3">
                <TableCell>
                  {flight.itineraries[0].segments[0].carrierCode}
                  {flight.itineraries[0].segments[0].flightNumber}
                </TableCell>
                <TableCell>
                  {flight.itineraries[0].segments[0].departure.iataCode}
                </TableCell>
                <TableCell>
                  {flight.itineraries[0].segments[0].departure.at}
                </TableCell>

                <TableCell>
                  {flight.itineraries[0].segments[0].arrival.iataCode}
                </TableCell>
                <TableCell>
                  {flight.itineraries[0].segments[0].arrival.at}
                </TableCell>
                <TableCell>{flight.itineraries[0].duration}</TableCell>
                <TableCell>{flight.seat[0][0]}</TableCell>
                <TableCell className="text-right">{flight.price}</TableCell>
              </TableRow>
            </>
          ))}
          {flightData.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                No Flight Available. Try Again with a date before november 2022
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BasicList;
