"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { marketingContainer } from "./layout";

type AdmissionBannerProps = {
  text: string;
};

export function AdmissionBanner({ text }: AdmissionBannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-lime text-deep">
      <div className={marketingContainer}>
        <div className="flex items-center justify-between gap-4 py-2.5 text-sm font-medium">
          <p className="flex-1">{text}</p>
          <Button size="sm" variant="secondary" render={<Link href="/admission" />}>
            Apply Now
          </Button>
          <button
            type="button"
            aria-label="Dismiss banner"
            className="rounded p-1 hover:bg-black/10"
            onClick={() => setVisible(false)}
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
