import { shopProducts } from "@/data/islamus/content";
import { ShopProductContent } from "./shop-product-content";

export function generateStaticParams() {
  return shopProducts.map((p) => ({ slug: p.slug }));
}

export default async function ShopProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ShopProductContent slug={slug} />;
}
