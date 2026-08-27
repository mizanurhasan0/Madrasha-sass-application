import { IslamusPageWrapper } from "@/components/islamus/islamus-page-wrapper";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <IslamusPageWrapper withCart>{children}</IslamusPageWrapper>;
}
