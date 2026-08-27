import type { User } from "@/types/user";

export const MADRASA_ID = "madrasa_alnoor";

export const mockUsers: User[] = [
  {
    id: "user_1",
    name: "Abdullah Rahman",
    email: "admin@example.com",
    phone: "01711111111",
    role: "super_admin",
    status: "active",
    createdAt: "2024-01-01",
  },
  {
    id: "user_2",
    name: "Mohammad Karim",
    email: "madrasa@example.com",
    phone: "01722222222",
    role: "madrasa_admin",
    madrasaId: MADRASA_ID,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "user_3",
    name: "Sheikh Nurul Islam",
    email: "teacher@example.com",
    phone: "01733333333",
    role: "teacher",
    madrasaId: MADRASA_ID,
    status: "active",
    createdAt: "2024-02-01",
  },
  {
    id: "user_4",
    name: "Fatima Begum",
    email: "accountant@example.com",
    phone: "01744444444",
    role: "accountant",
    madrasaId: MADRASA_ID,
    status: "active",
    createdAt: "2024-02-15",
  },
  {
    id: "user_5",
    name: "Abdul Hamid",
    email: "guardian@example.com",
    phone: "01755555555",
    role: "guardian",
    madrasaId: MADRASA_ID,
    status: "active",
    createdAt: "2024-03-01",
  },
];

export const DEMO_PASSWORD = "password123";
