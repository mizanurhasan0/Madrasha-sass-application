"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Money, DateDisplay } from "@/components/common/format-display";
import { siteConfig } from "@/config/site";
import type { Receipt } from "@/types/fee";

type ReceiptPrintViewProps = {
  receipt: Receipt;
  studentName: string;
  studentId: string;
  feeType?: string;
  method?: string;
  onClose?: () => void;
};

export function ReceiptPrintView({
  receipt,
  studentName,
  studentId,
  feeType,
  method,
  onClose,
}: ReceiptPrintViewProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      <div className="receipt-print mx-auto max-w-md rounded-xl border bg-card p-6 shadow-sm">
        <div className="border-b pb-4 text-center">
          <h2 className="text-lg font-bold">{siteConfig.madrasaName}</h2>
          <p className="text-xs text-muted-foreground">{siteConfig.contact.address}</p>
          <p className="text-xs text-muted-foreground">{siteConfig.contact.phone}</p>
        </div>

        <div className="space-y-3 py-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Receipt No.</span>
            <span className="font-medium">{receipt.receiptNo}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date</span>
            <DateDisplay date={receipt.date} />
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Student</span>
            <span className="font-medium">{studentName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Student ID</span>
            <span>{studentId}</span>
          </div>
          {feeType && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fee Type</span>
              <span className="capitalize">{feeType}</span>
            </div>
          )}
          {method && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Method</span>
              <span>{method}</span>
            </div>
          )}
          <div className="flex justify-between border-t pt-3 text-base">
            <span className="font-semibold">Amount Paid</span>
            <Money amount={receipt.amount} />
          </div>
        </div>

        <p className="border-t pt-4 text-center text-xs text-muted-foreground">
          Thank you for your payment. This is a computer-generated receipt.
        </p>
      </div>

      <div className="flex justify-end gap-2 print:hidden">
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        )}
        <Button onClick={handlePrint}>
          <Printer className="size-4" />
          Print Receipt
        </Button>
      </div>
    </div>
  );
}
