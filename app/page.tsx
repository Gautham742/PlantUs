import Features from "@/components/features";
import Hero from "@/components/hero";
import { sign } from "crypto";
import Image from "next/image";
export default function Home() {
  return (
    <>
    <Hero/>
    <Features/>
    </>
  );
}


