import type { Metadata } from "next";
import { IslamusPageWrapper } from "@/components/islamus/islamus-page-wrapper";
import { NewsContent } from "./news-content";

export const metadata: Metadata = { title: "News | Islamus" };

export default function NewsPage() {
  return (
    <IslamusPageWrapper>
      <NewsContent />
    </IslamusPageWrapper>
  );
}
