import { Metadata } from "next";
import { GatewayContent } from "@/components/gateway/GatewayContent";

export const metadata: Metadata = {
  title: "Aakansh Anand | Digital Experience Engineer",
  description: "Initialize the journey into the digital archive of Aakansh Anand.",
};

export default function GatewayPage() {
  return <GatewayContent />;
}
