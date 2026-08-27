"use client";

import Image from "next/image";
import Link from "next/link";
import { shopProducts } from "@/data/islamus/content";
import { PageTitle } from "@/components/islamus/layout/page-title";
import { SecTitle } from "@/components/islamus/ui/sec-title";
import { ThemeBtn } from "@/components/islamus/ui/theme-btn";
import { useCart } from "@/components/islamus/shop/cart-provider";
import { WowReveal } from "@/components/islamus/animations/wow-reveal";
import { wowStaggerDelay } from "@/lib/wow-stagger";

export function ShopContent() {
  const { addItem } = useCart();

  return (
    <>
      <PageTitle title="Shop" breadcrumb={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
      <section className="is-pt-120 is-pb-120">
        <div className="is-container">
          <div className="mb-8 flex justify-end">
            <ThemeBtn href="/shop/cart" variant="five">
              View Cart
            </ThemeBtn>
          </div>
          <SecTitle subTitle="Shop" title="Islamic Products" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {shopProducts.map((p, i) => (
              <WowReveal key={p.slug} delay={wowStaggerDelay(i)}>
                <div className="is-product-card">
                  <Link href={`/shop/${p.slug}`}>
                    <Image src={p.image} alt={p.name} width={300} height={300} />
                  </Link>
                  <div className="is-product-body">
                    <h3 className="font-semibold">
                      <Link href={`/shop/${p.slug}`}>{p.name}</Link>
                    </h3>
                    <p className="is-product-price mt-2">${p.price}</p>
                    <ThemeBtn
                      variant="six"
                      className="mt-4 w-full justify-center"
                      onClick={() => addItem(p)}
                    >
                      Add to Cart
                    </ThemeBtn>
                  </div>
                </div>
              </WowReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
