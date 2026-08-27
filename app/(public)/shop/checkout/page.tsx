"use client";

import { PageTitle } from "@/components/islamus/layout/page-title";
import { ThemeBtn } from "@/components/islamus/ui/theme-btn";
import { useCart } from "@/components/islamus/shop/cart-provider";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();

  return (
    <>
      <PageTitle title="Checkout" breadcrumb={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: "Checkout" }]} />
      <section className="is-pt-120 is-pb-120">
        <div className="is-container max-w-xl">
          {items.length === 0 ? (
            <p className="text-center text-[var(--text-color)]">No items to checkout.</p>
          ) : (
            <form
              className="space-y-4 rounded-2xl bg-white p-8 shadow-[var(--shadow-soft)]"
              onSubmit={(e) => {
                e.preventDefault();
                clear();
                alert("Order placed successfully!");
              }}
            >
              <p className="font-semibold mb-4">Order Total: ${total}</p>
              <input type="text" placeholder="Full Name" className="is-form-input" required />
              <input type="email" placeholder="Email" className="is-form-input" required />
              <input type="text" placeholder="Address" className="is-form-input" required />
              <input type="text" placeholder="Card Number" className="is-form-input" required />
              <ThemeBtn type="submit" variant="one">Place Order</ThemeBtn>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
