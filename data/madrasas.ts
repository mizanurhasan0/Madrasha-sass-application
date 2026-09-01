import type { Madrasa, SubscriptionPlan, Subscription } from "@/types/madrasa";

export const subscriptionPlans: SubscriptionPlan[] = [
  { id: "plan_1", name: "Starter", price: 3000, interval: "monthly", features: ["Up to 100 students", "Basic reports", "Email support"], maxStudents: 100, status: "active" },
  { id: "plan_2", name: "Professional", price: 7000, interval: "monthly", features: ["Up to 500 students", "Advanced reports", "Priority support", "Website CMS"], maxStudents: 500, status: "active" },
  { id: "plan_3", name: "Enterprise", price: 15000, interval: "monthly", features: ["Unlimited students", "Custom reports", "Dedicated support", "API access"], maxStudents: 9999, status: "active" },
];

export const madrasas: Madrasa[] = [
  { id: "madrasa_alnoor", name: "Al-Noor Islamic Academy", slug: "al-noor", adminName: "Mohammad Karim", adminEmail: "madrasa@example.com", phone: "01722222222", address: "Mirpur DOHS, Dhaka", studentCount: 450, teacherCount: 28, planId: "plan_2", status: "active", joinedAt: "2023-06-15", theme: { primary: "oklch(0.38 0.1 148)", accent: "oklch(0.87 0.16 118)", deep: "oklch(0.26 0.05 165)" } },
  { id: "madrasa_2", name: "Darul Huda Madrasa", slug: "darul-huda", adminName: "Maulana Yusuf", adminEmail: "admin@darulhuda.edu.bd", phone: "01711223344", address: "Uttara, Dhaka", studentCount: 320, teacherCount: 22, planId: "plan_2", status: "active", joinedAt: "2023-08-20" },
  { id: "madrasa_3", name: "Al-Hidayah Institute", slug: "al-hidayah", adminName: "Abdul Mannan", adminEmail: "admin@alhidayah.edu.bd", phone: "01722334455", address: "Gazipur", studentCount: 180, teacherCount: 15, planId: "plan_1", status: "active", joinedAt: "2024-01-10" },
  { id: "madrasa_4", name: "Jamia Islamia", slug: "jamia-islamia", adminName: "Sheikh Ahmad", adminEmail: "admin@jamia.edu.bd", phone: "01733445566", address: "Narayanganj", studentCount: 520, teacherCount: 35, planId: "plan_3", status: "active", joinedAt: "2023-03-05" },
  { id: "madrasa_5", name: "Noorani Madrasa", slug: "noorani", adminName: "Hafiz Rahman", adminEmail: "admin@noorani.edu.bd", phone: "01744556677", address: "Mirpur 10, Dhaka", studentCount: 95, teacherCount: 8, planId: "plan_1", status: "active", joinedAt: "2024-06-01" },
  { id: "madrasa_6", name: "Tahfizul Quran Center", slug: "tahfizul", adminName: "Maulana Farid", adminEmail: "admin@tahfizul.edu.bd", phone: "01755667788", address: "Uttara Sector 12", studentCount: 75, teacherCount: 6, planId: "plan_1", status: "pending", joinedAt: "2025-07-15" },
  { id: "madrasa_7", name: "Al-Furqan Academy", slug: "al-furqan", adminName: "Dr. Hassan", adminEmail: "admin@alfurqan.edu.bd", phone: "01766778899", address: "Gazipur Sadar", studentCount: 280, teacherCount: 20, planId: "plan_2", status: "active", joinedAt: "2023-11-20" },
  { id: "madrasa_8", name: "Iqra Islamic School", slug: "iqra", adminName: "Nasima Akter", adminEmail: "admin@iqra.edu.bd", phone: "01777889900", address: "Dhaka Cantonment", studentCount: 150, teacherCount: 12, planId: "plan_1", status: "inactive", joinedAt: "2024-02-28" },
];

export const subscriptions: Subscription[] = madrasas.map((m, i) => ({
  id: `sub_${i + 1}`,
  madrasaId: m.id,
  planId: m.planId,
  status: m.status === "active" ? "active" : m.status === "pending" ? "active" : "expired",
  startDate: m.joinedAt,
  endDate: "2025-12-31",
  amount: subscriptionPlans.find((p) => p.id === m.planId)?.price ?? 0,
}));

export const dashboardMetrics = {
  superAdmin: {
    totalMadrasas: madrasas.length,
    activeMadrasas: madrasas.filter((m) => m.status === "active").length,
    totalStudents: madrasas.reduce((s, m) => s + m.studentCount, 0),
    totalTeachers: madrasas.reduce((s, m) => s + m.teacherCount, 0),
    activeSubscriptions: subscriptions.filter((s) => s.status === "active").length,
    monthlyRevenue: subscriptions.filter((s) => s.status === "active").reduce((s, sub) => s + sub.amount, 0),
    madrasaGrowth: [
      { month: "Jan", count: 45 }, { month: "Feb", count: 52 }, { month: "Mar", count: 58 },
      { month: "Apr", count: 65 }, { month: "May", count: 72 }, { month: "Jun", count: 78 },
      { month: "Jul", count: 85 }, { month: "Aug", count: 92 },
    ],
    subscriptionDistribution: [
      { name: "Starter", value: 35 }, { name: "Professional", value: 45 }, { name: "Enterprise", value: 20 },
    ],
    monthlyRevenueChart: [
      { month: "Jan", revenue: 420000 }, { month: "Feb", revenue: 445000 }, { month: "Mar", revenue: 480000 },
      { month: "Apr", revenue: 510000 }, { month: "May", revenue: 535000 }, { month: "Jun", revenue: 560000 },
      { month: "Jul", revenue: 590000 }, { month: "Aug", revenue: 620000 },
    ],
  },
  madrasaAdmin: {
    totalStudents: 24,
    totalTeachers: 12,
    todayAttendance: { present: 18, absent: 3, late: 2, leave: 1, total: 24 },
    todayCollection: 12500,
    totalDue: 87500,
    upcomingExams: 2,
    studentGrowth: [
      { month: "Jan", count: 18 }, { month: "Feb", count: 19 }, { month: "Mar", count: 20 },
      { month: "Apr", count: 21 }, { month: "May", count: 22 }, { month: "Jun", count: 23 },
      { month: "Jul", count: 23 }, { month: "Aug", count: 24 },
    ],
    attendanceOverview: [
      { day: "Mon", present: 22 }, { day: "Tue", present: 21 }, { day: "Wed", present: 23 },
      { day: "Thu", present: 20 }, { day: "Fri", present: 18 }, { day: "Sat", present: 0 },
    ],
    feeCollection: [
      { month: "Jan", collected: 55000 }, { month: "Feb", collected: 52000 }, { month: "Mar", collected: 58000 },
      { month: "Apr", collected: 54000 }, { month: "May", collected: 56000 }, { month: "Jun", collected: 60000 },
      { month: "Jul", collected: 57000 }, { month: "Aug", collected: 62000 },
    ],
  },
};
