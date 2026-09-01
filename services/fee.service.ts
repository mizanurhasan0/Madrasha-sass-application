import type { PaginatedQuery } from "@/types/common";
import type { Fee, Payment } from "@/types/fee";
import { fees as initialFees, payments as initialPayments, receipts as initialReceipts } from "@/data/payments";
import { generateId, paginate, simulateLatency, success } from "./base.service";

const feesStore = [...initialFees];
const paymentsStore = [...initialPayments];
const receiptsStore = [...initialReceipts];

export const feeService = {
  async getFees() {
    await simulateLatency();
    return success(feesStore);
  },

  async getPayments(query?: PaginatedQuery & { status?: string }) {
    await simulateLatency();
    let filtered = [...paymentsStore];
    if (query?.status) filtered = filtered.filter((p) => p.status === query.status);
    return success(
      paginate(filtered, query, { searchKeys: ["invoiceNo", "studentId"] })
    );
  },

  async getDueList() {
    await simulateLatency();
    return success(paymentsStore.filter((p) => p.due > 0));
  },

  async getReceipts() {
    await simulateLatency();
    return success(receiptsStore);
  },

  async createPayment(input: Partial<Payment> & { studentId: string; amount: number }) {
    await simulateLatency();
    const payment: Payment = {
      id: generateId("pay"),
      invoiceNo: `INV-${String(paymentsStore.length + 1).padStart(5, "0")}`,
      studentId: input.studentId,
      feeId: input.feeId ?? "fee_2",
      feeType: input.feeType ?? "monthly",
      amount: input.amount,
      paid: input.paid ?? input.amount,
      due: input.due ?? 0,
      status: input.status ?? "paid",
      date: new Date().toISOString().split("T")[0],
      method: input.method ?? "Cash",
      madrasaId: "madrasa_alnoor",
    };
    paymentsStore.push(payment);
    if (payment.paid > 0) {
      receiptsStore.push({
        id: generateId("rcpt"),
        paymentId: payment.id,
        receiptNo: `RCP-${String(receiptsStore.length + 1).padStart(5, "0")}`,
        studentId: payment.studentId,
        amount: payment.paid,
        date: payment.date,
        madrasaId: "madrasa_alnoor",
      });
    }
    return success(payment);
  },

  async getStats() {
    await simulateLatency();
    const today = new Date().toISOString().split("T")[0];
    const todayPayments = paymentsStore.filter((p) => p.date === today);
    return success({
      totalCollection: paymentsStore.reduce((s, p) => s + p.paid, 0),
      totalDue: paymentsStore.reduce((s, p) => s + p.due, 0),
      todayCollection: todayPayments.reduce((s, p) => s + p.paid, 0),
      monthlyCollection: paymentsStore
        .filter((p) => p.date.startsWith(today.slice(0, 7)))
        .reduce((s, p) => s + p.paid, 0),
    });
  },

  getAllPayments() {
    return paymentsStore;
  },
};
