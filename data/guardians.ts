import type { Guardian } from "@/types/guardian";
import { MADRASA_ID } from "./users";

export const guardians: Guardian[] = [
  { id: "guardian_1", name: "Abdul Hamid", phone: "01755555555", email: "guardian@example.com", address: "Mirpur, Dhaka", occupation: "Business", relation: "Father", studentIds: ["student_1", "student_2"], status: "active", madrasaId: MADRASA_ID },
  { id: "guardian_2", name: "Rashida Begum", phone: "01766666666", address: "Uttara, Dhaka", occupation: "Homemaker", relation: "Mother", studentIds: ["student_3"], status: "active", madrasaId: MADRASA_ID },
  { id: "guardian_3", name: "Mohammad Ali", phone: "01777777777", address: "Gazipur", occupation: "Teacher", relation: "Father", studentIds: ["student_4", "student_5"], status: "active", madrasaId: MADRASA_ID },
  { id: "guardian_4", name: "Shahida Khatun", phone: "01788888888", address: "Narayanganj", occupation: "Doctor", relation: "Mother", studentIds: ["student_6"], status: "active", madrasaId: MADRASA_ID },
  { id: "guardian_5", name: "Imran Hossain", phone: "01799999999", address: "Mirpur DOHS, Dhaka", occupation: "Engineer", relation: "Father", studentIds: ["student_7"], status: "active", madrasaId: MADRASA_ID },
  { id: "guardian_6", name: "Nasreen Akter", phone: "01811111111", address: "Uttara Sector 7, Dhaka", occupation: "Banker", relation: "Mother", studentIds: ["student_8"], status: "active", madrasaId: MADRASA_ID },
  { id: "guardian_7", name: "Kamal Uddin", phone: "01822222222", address: "Gazipur Sadar", occupation: "Farmer", relation: "Father", studentIds: ["student_9", "student_10"], status: "active", madrasaId: MADRASA_ID },
  { id: "guardian_8", name: "Salma Parvin", phone: "01833333333", address: "Mirpur 10, Dhaka", occupation: "Teacher", relation: "Mother", studentIds: ["student_11"], status: "active", madrasaId: MADRASA_ID },
];
