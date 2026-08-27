import type { Metadata } from "next";
import { ShopContent } from "./shop-content";

export const metadata: Metadata = { title: "Shop | Islamus" };

export default function ShopPage() {
  return <ShopContent />;
}
