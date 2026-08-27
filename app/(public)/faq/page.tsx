import type { Metadata } from "next";
import { IslamusPageWrapper } from "@/components/islamus/islamus-page-wrapper";
import { FaqContent } from "./faq-content";

export const metadata: Metadata = { title: "FAQ | Islamus" };

export default function FaqPage() {
  return (
    <IslamusPageWrapper>
      <FaqContent />
    </IslamusPageWrapper>
  );
}
