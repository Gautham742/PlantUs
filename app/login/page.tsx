"use client";
import Image from "next/image";
import Login from "@/components/login";
export default function Home() {

  return (
    <main className="relative mx-10 mt-8 mb-8">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-[3rem] md:gap-[4rem] w-full">
        <section className="flex flex-col items-center justify-center gap-8 max-w-[33.2rem]">
          <Login/>
        </section>
      </section>
    </main>
  );
}