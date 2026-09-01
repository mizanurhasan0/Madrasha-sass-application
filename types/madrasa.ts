import type { Status } from "./common";

export type MadrasaTheme = {
  primary: string;
  accent: string;
  deep: string;
  radius?: string;
  logoUrl?: string;
};

export type Madrasa = {
  id: string;
  name: string;
  slug: string;
  adminName: string;
  adminEmail: string;
  phone: string;
  address: string;
  studentCount: number;
  teacherCount: number;
  planId: string;
  status: Status;
  joinedAt: string;
  theme?: MadrasaTheme;
};

export type SubscriptionPlan = {
  id: string;
  name: string;
  price: number;
  interval: "monthly" | "yearly";
  features: string[];
  maxStudents: number;
  status: Status;
};

export type Subscription = {
  id: string;
  madrasaId: string;
  planId: string;
  status: "active" | "expired" | "cancelled";
  startDate: string;
  endDate: string;
  amount: number;
};
