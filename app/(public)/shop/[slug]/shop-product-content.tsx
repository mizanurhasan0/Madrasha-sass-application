"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { shopProducts } from "@/data/islamus/content";
import { PageTitle } from "@/components/islamus/layout/page-title";
import { ThemeBtn } from "@/components/islamus/ui/theme-btn";
import { useCart } from "@/components/islamus/shop/cart-provider";

export function ShopProductContent({ slug }: { slug: string }) {
  const product = shopProducts.find((p) => p.slug === slug);
  const { addItem } = useCart();
  if (!product) notFound();

  return (
    <>
      <PageTitle
        title={product.name}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: product.name },
        ]}
      />
      <section className="is-pt-120 is-pb-120">
        <div className="is-container">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </div>
            <div>
              <h2 className="is-title">{product.name}</h2>
              <p className="is-product-price mt-4">${product.price}</p>
              <p className="mt-4 text-[var(--text-color)] leading-relaxed">
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
              </p>
              <ThemeBtn variant="one" className="mt-6" onClick={() => addItem(product)}>
                Add to Cart
              </ThemeBtn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
