"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
  q: string;
  a: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className="is-faq-item">
          <button
            type="button"
            className="is-faq-trigger"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="is-faq-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="flex-1">{item.q}</span>
            <ChevronDown className={cn("size-5 transition-transform", open === i && "rotate-180")} />
          </button>
          {open === i && <div className="is-faq-content">{item.a}</div>}
        </div>
      ))}
    </div>
  );
}
