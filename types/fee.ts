export type FeeType =
  | "admission"
  | "monthly"
  | "exam"
  | "hostel"
  | "transport"
  | "other";

export type Fee = {
  id: string;
  name: string;
  type: FeeType;
  amount: number;
  classId?: string;
  dueDate?: string;
  status: "active" | "inactive";
  madrasaId: string;
};

export type PaymentStatus = "paid" | "partial" | "due" | "overdue";

export type Payment = {
  id: string;
  invoiceNo: string;
  studentId: string;
  feeId: string;
  feeType: FeeType;
  amount: number;
  paid: number;
  due: number;
  status: PaymentStatus;
  date: string;
  method?: string;
  madrasaId: string;
};

export type Receipt = {
  id: string;
  paymentId: string;
  receiptNo: string;
  studentId: string;
  amount: number;
  date: string;
  madrasaId: string;
};
