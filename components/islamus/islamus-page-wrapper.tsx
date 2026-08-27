"use client";

import { AnimationProvider } from "@/components/islamus/animations/animation-provider";
import { CartProvider } from "@/components/islamus/shop/cart-provider";
import { IslamusStyles } from "@/components/islamus/islamus-styles";

type IslamusPageWrapperProps = {
  children: React.ReactNode;
  withCart?: boolean;
};

export function IslamusPageWrapper({ children, withCart = false }: IslamusPageWrapperProps) {
  const content = (
    <>
      <IslamusStyles />
      {children}
    </>
  );

  if (withCart) {
    return (
      <CartProvider>
        <AnimationProvider>{content}</AnimationProvider>
      </CartProvider>
    );
  }

  return <AnimationProvider>{content}</AnimationProvider>;
}
