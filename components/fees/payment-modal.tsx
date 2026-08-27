"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormModal } from "@/components/common/form-modal";
import { FilterDropdown } from "@/components/common/filter-dropdown";
import { feeService } from "@/services/fee.service";
import { studentService } from "@/services/student.service";
import type { Fee, FeeType } from "@/types/fee";
import { toast } from "sonner";

type PaymentModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fees: Fee[];
  onSuccess: () => void;
};

const PAYMENT_METHODS = ["Cash", "bKash", "Bank Transfer", "Nagad"];

export function PaymentModal({ open, onOpenChange, fees, onSuccess }: PaymentModalProps) {
  const [studentId, setStudentId] = useState("");
  const [feeId, setFeeId] = useState("");
  const [amount, setAmount] = useState("");
  const [paid, setPaid] = useState("");
  const [method, setMethod] = useState("Cash");
  const [submitting, setSubmitting] = useState(false);

  const students = useMemo(
    () => studentService.getAll().filter((s) => s.status === "active"),
    []
  );
  const studentOptions = students.map((s) => ({
    label: `${s.name} (${s.studentId})`,
    value: s.id,
  }));

  useEffect(() => {
    if (open) {
      setStudentId(students[0]?.id ?? "");
      setFeeId(fees[0]?.id ?? "");
      setAmount(fees[0]?.amount.toString() ?? "");
      setPaid(fees[0]?.amount.toString() ?? "");
      setMethod("Cash");
    }
  }, [open, fees, students]);

  useEffect(() => {
    const fee = fees.find((f) => f.id === feeId);
    if (fee) {
      setAmount(fee.amount.toString());
      setPaid(fee.amount.toString());
    }
  }, [feeId, fees]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId || !feeId) return;

    const amountNum = Number(amount);
    const paidNum = Number(paid);
    if (amountNum <= 0 || paidNum < 0) {
      toast.error("Enter valid amounts");
      return;
    }

    setSubmitting(true);
    const fee = fees.find((f) => f.id === feeId);
    const due = Math.max(0, amountNum - paidNum);
    const status = due === 0 ? "paid" : paidNum > 0 ? "partial" : "due";

    const res = await feeService.createPayment({
      studentId,
      feeId,
      feeType: fee?.type ?? ("monthly" as FeeType),
      amount: amountNum,
      paid: paidNum,
      due,
      status,
      method,
    });

    setSubmitting(false);

    if (res.success) {
      toast.success("Payment recorded successfully");
      onOpenChange(false);
      onSuccess();
    } else {
      toast.error("Failed to record payment");
    }
  };

  return (
    <FormModal
      open={open}
      onOpenChange={onOpenChange}
      title="Record Payment"
      description="Enter payment details for a student."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FilterDropdown
          label="Student"
          value={studentId}
          onChange={setStudentId}
          options={studentOptions}
          placeholder="Select student"
        />

        <div className="space-y-1">
          <Label>Fee Type</Label>
          <Select value={feeId} onValueChange={(v) => v && setFeeId(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select fee" />
            </SelectTrigger>
            <SelectContent>
              {fees.map((fee) => (
                <SelectItem key={fee.id} value={fee.id}>
                  {fee.name} — ৳{fee.amount.toLocaleString()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <Label htmlFor="amount">Total Amount (৳)</Label>
            <Input
              id="amount"
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="paid">Paid Amount (৳)</Label>
            <Input
              id="paid"
              type="number"
              min={0}
              value={paid}
              onChange={(e) => setPaid(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label>Payment Method</Label>
          <Select value={method} onValueChange={(v) => v && setMethod(v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAYMENT_METHODS.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Saving..." : "Record Payment"}
          </Button>
        </div>
      </form>
    </FormModal>
  );
}
