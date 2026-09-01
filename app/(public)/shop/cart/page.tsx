"use client";

import Image from "next/image";
import Link from "next/link";
import { PageTitle } from "@/components/islamus/layout/page-title";
import { ThemeBtn } from "@/components/islamus/ui/theme-btn";
import { useCart } from "@/components/islamus/shop/cart-provider";

export default function CartPage() {
  const { items, removeItem, updateQty, total } = useCart();

  return (
    <>
      <PageTitle title="Cart" breadcrumb={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: "Cart" }]} />
      <section className="is-pt-120 is-pb-120">
        <div className="is-container max-w-3xl">
          {items.length === 0 ? (
            <div className="text-center">
              <p className="text-[var(--text-color)] mb-6">Your cart is empty.</p>
              <ThemeBtn href="/shop" variant="one">Continue Shopping</ThemeBtn>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.slug} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-[var(--shadow-soft)]">
                    <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-lg object-cover" />
                    <div className="flex-1">
                      <Link href={`/shop/${item.slug}`} className="font-semibold">{item.name}</Link>
                      <p className="is-product-price">${item.price}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button type="button" className="px-2 py-1 border rounded" onClick={() => updateQty(item.slug, item.qty - 1)}>-</button>
                        <span>{item.qty}</span>
                        <button type="button" className="px-2 py-1 border rounded" onClick={() => updateQty(item.slug, item.qty + 1)}>+</button>
                        <button type="button" className="ml-4 text-sm text-status-danger-fg" onClick={() => removeItem(item.slug)}>Remove</button>
                      </div>
                    </div>
                    <p className="font-semibold">${item.price * item.qty}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex items-center justify-between border-t pt-6">
                <p className="text-xl font-bold">Total: ${total}</p>
                <ThemeBtn href="/shop/checkout" variant="one">Checkout</ThemeBtn>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
