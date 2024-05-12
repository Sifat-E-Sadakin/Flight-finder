"use client";
import BasicForm from "@/components/block/BasicForm";
import BasicList from "@/components/block/BasicList";
import Image from "next/image";
import data from "../../public/data/data.json";
import { useState } from "react";

export default function Home() {
  const [flightData, setFlightData] = useState(data.flightOffer);
  console.log(flightData);
  return (
    <main className={`container mx-auto h-full pt-5`}>
      <div className="bg-white/80 p-5 rounded backdrop-blur">
        <BasicForm flightData={flightData} setFlightData={setFlightData} />
      </div>
      <div className="h-[calc(100vh-220px)] mt-5 bg-white/80 overflow-y-scroll p-5 rounded">
        <BasicList flightData={flightData} />
      </div>
    </main>
  );
}
