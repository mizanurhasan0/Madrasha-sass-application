import type { Metadata } from "next";
import { IslamusPageWrapper } from "@/components/islamus/islamus-page-wrapper";
import { TestimonialsContent } from "./testimonials-content";

export const metadata: Metadata = { title: "Testimonials | Islamus" };

export default function TestimonialsPage() {
  return (
    <IslamusPageWrapper>
      <TestimonialsContent />
    </IslamusPageWrapper>
  );
}
