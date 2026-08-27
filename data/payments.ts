import type { Fee, Payment, Receipt } from "@/types/fee";
import { MADRASA_ID } from "./users";
import { students } from "./students";

export const fees: Fee[] = [
  { id: "fee_1", name: "Admission Fee", type: "admission", amount: 5000, status: "active", madrasaId: MADRASA_ID },
  { id: "fee_2", name: "Monthly Tuition", type: "monthly", amount: 2500, status: "active", madrasaId: MADRASA_ID },
  { id: "fee_3", name: "Exam Fee", type: "exam", amount: 1000, status: "active", madrasaId: MADRASA_ID },
  { id: "fee_4", name: "Hostel Fee", type: "hostel", amount: 3500, status: "active", madrasaId: MADRASA_ID },
  { id: "fee_5", name: "Transport Fee", type: "transport", amount: 1500, status: "active", madrasaId: MADRASA_ID },
  { id: "fee_6", name: "Library Fee", type: "other", amount: 500, status: "active", madrasaId: MADRASA_ID },
];

const feeTypes: Payment["feeType"][] = ["monthly", "monthly", "exam", "admission", "hostel", "transport"];
const statuses: Payment["status"][] = ["paid", "paid", "partial", "due", "overdue", "paid"];

export const payments: Payment[] = Array.from({ length: 30 }, (_, i) => {
  const student = students[i % students.length];
  const fee = fees[i % fees.length];
  const amount = fee.amount;
  const status = statuses[i % statuses.length];
  const paid = status === "paid" ? amount : status === "partial" ? Math.floor(amount * 0.6) : status === "due" ? 0 : Math.floor(amount * 0.3);
  return {
    id: `pay_${i + 1}`,
    invoiceNo: `INV-${String(i + 1).padStart(5, "0")}`,
    studentId: student.id,
    feeId: fee.id,
    feeType: feeTypes[i % feeTypes.length],
    amount,
    paid,
    due: amount - paid,
    status,
    date: `2025-${String((i % 8) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
    method: paid > 0 ? ["Cash", "bKash", "Bank Transfer"][i % 3] : undefined,
    madrasaId: MADRASA_ID,
  };
});

export const receipts: Receipt[] = payments
  .filter((p) => p.paid > 0)
  .map((p, i) => ({
    id: `rcpt_${i + 1}`,
    paymentId: p.id,
    receiptNo: `RCP-${String(i + 1).padStart(5, "0")}`,
    studentId: p.studentId,
    amount: p.paid,
    date: p.date,
    madrasaId: MADRASA_ID,
  }));
