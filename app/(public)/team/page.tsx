import type { Metadata } from "next";
import { IslamusPageWrapper } from "@/components/islamus/islamus-page-wrapper";
import { TeamContent } from "./team-content";

export const metadata: Metadata = { title: "Team | Islamus" };

export default function TeamPage() {
  return (
    <IslamusPageWrapper>
      <TeamContent />
    </IslamusPageWrapper>
  );
}
