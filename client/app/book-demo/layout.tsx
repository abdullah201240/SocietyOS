import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Demo",
  description: "Schedule a personalized demo of BuildingOS. See how we help property managers streamline building operations, billing, and resident management.",
};

export default function BookDemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
