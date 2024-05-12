import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const BasicList = ({ flightData }) => {
  console.log(flightData);
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
        <TableBody className="text-black">
          {flightData.map((flight, index) => (
            <>
              <TableRow key={index}>
                <TableCell>
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
        </TableBody>
      </Table>
    </div>
  );
};

export default BasicList;
