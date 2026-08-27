import type { Metadata } from "next";
import { IslamusPageWrapper } from "@/components/islamus/islamus-page-wrapper";
import { CausesContent } from "./causes-content";

export const metadata: Metadata = { title: "Causes | Islamus" };

export default function CausesPage() {
  return (
    <IslamusPageWrapper>
      <CausesContent />
    </IslamusPageWrapper>
  );
}
