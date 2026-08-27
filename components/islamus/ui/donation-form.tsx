"use client";

import { useState } from "react";
import { donationAmounts } from "@/data/islamus/content";
import { ThemeBtn } from "./theme-btn";

export function DonationForm() {
  const [amount, setAmount] = useState<number | "custom">(50);
  const [custom, setCustom] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="is-donation-pills">
        {donationAmounts.map((a) => (
          <button
            key={a}
            type="button"
            className={`is-donation-pill ${amount === a ? "is-active" : ""}`}
            onClick={() => setAmount(a)}
          >
            ${a}
          </button>
        ))}
        <button
          type="button"
          className={`is-donation-pill ${amount === "custom" ? "is-active" : ""}`}
          onClick={() => setAmount("custom")}
        >
          Custom
        </button>
      </div>
      {amount === "custom" && (
        <input
          type="number"
          className="is-form-input mb-4 max-w-xs"
          placeholder="Enter amount"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
        />
      )}
      <ThemeBtn type="submit" variant="five">
        Donate Now
      </ThemeBtn>
    </form>
  );
}
