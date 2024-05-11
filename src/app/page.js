"use client";
import BasicForm from "@/components/block/BasicForm";
import BasicList from "@/components/block/BasicList";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container mx-auto">
      <BasicForm />
      <BasicList />
    </main>
  );
}
