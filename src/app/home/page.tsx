import { Metadata } from "next";
import { HomeContent } from "@/components/home/HomeContent";

export const metadata: Metadata = {
  title: "Home | Aakansh Anand",
  description: "Explore the digital archive and interactive experiences of Aakansh Anand.",
};

export default function HomePage() {
  return <HomeContent />;
}
