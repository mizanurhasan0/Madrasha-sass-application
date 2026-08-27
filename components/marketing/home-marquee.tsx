"use client";

import { Marquee } from "@/components/marketing/marquee";
import { useT } from "@/lib/i18n/locale-provider";

export function HomeMarquee() {
  const t = useT();

  const items = [
    t("marquee.item1"),
    t("marquee.item2"),
    t("marquee.item3"),
    t("marquee.item4"),
    t("marquee.item5"),
    t("marquee.item6"),
  ];

  return <Marquee items={items} />;
}
