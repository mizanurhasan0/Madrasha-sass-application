import type { UserRole } from "@/types/user";
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  Package,
  Users,
  BarChart3,
  Settings,
  GraduationCap,
  UserSquare2,
  BookOpen,
  ClipboardCheck,
  Wallet,
  FileText,
  Bell,
  Calendar,
  Image,
  Globe,
  User,
  Receipt,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  titleKey: string;
  href: string;
  icon: LucideIcon;
  roles: UserRole[];
};

export const navigationItems: NavItem[] = [
  { titleKey: "nav.dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["super_admin", "madrasa_admin", "teacher", "accountant", "guardian"] },
  { titleKey: "nav.madrasas", href: "/dashboard/madrasas", icon: Building2, roles: ["super_admin"] },
  { titleKey: "nav.subscriptions", href: "/dashboard/subscriptions", icon: CreditCard, roles: ["super_admin"] },
  { titleKey: "nav.plans", href: "/dashboard/plans", icon: Package, roles: ["super_admin"] },
  { titleKey: "nav.users", href: "/dashboard/users", icon: Users, roles: ["super_admin"] },
  { titleKey: "nav.payments", href: "/dashboard/payments", icon: Wallet, roles: ["super_admin", "madrasa_admin", "accountant"] },
  { titleKey: "nav.students", href: "/dashboard/students", icon: GraduationCap, roles: ["madrasa_admin"] },
  { titleKey: "nav.teachersStaff", href: "/dashboard/teachers", icon: UserSquare2, roles: ["madrasa_admin"] },
  { titleKey: "nav.academic", href: "/dashboard/academics/classes", icon: BookOpen, roles: ["madrasa_admin"] },
  { titleKey: "nav.attendance", href: "/dashboard/attendance", icon: ClipboardCheck, roles: ["madrasa_admin", "teacher", "guardian"] },
  { titleKey: "nav.feesPayments", href: "/dashboard/fees", icon: Wallet, roles: ["madrasa_admin"] },
  { titleKey: "nav.examsResults", href: "/dashboard/exams", icon: FileText, roles: ["madrasa_admin", "teacher", "guardian"] },
  { titleKey: "nav.notices", href: "/dashboard/notices", icon: Bell, roles: ["madrasa_admin", "teacher", "guardian"] },
  { titleKey: "nav.events", href: "/dashboard/events", icon: Calendar, roles: ["madrasa_admin"] },
  { titleKey: "nav.gallery", href: "/dashboard/gallery", icon: Image, roles: ["madrasa_admin"] },
  { titleKey: "nav.website", href: "/dashboard/website", icon: Globe, roles: ["madrasa_admin"] },
  { titleKey: "nav.myClasses", href: "/dashboard/my-classes", icon: BookOpen, roles: ["teacher"] },
  { titleKey: "nav.myStudents", href: "/dashboard/my-students", icon: GraduationCap, roles: ["teacher"] },
  { titleKey: "nav.results", href: "/dashboard/results", icon: FileText, roles: ["teacher"] },
  { titleKey: "nav.fees", href: "/dashboard/fees", icon: Wallet, roles: ["accountant"] },
  { titleKey: "nav.dueList", href: "/dashboard/due-list", icon: ClipboardList, roles: ["accountant"] },
  { titleKey: "nav.receipts", href: "/dashboard/receipts", icon: Receipt, roles: ["accountant"] },
  { titleKey: "nav.financialReports", href: "/dashboard/financial-reports", icon: BarChart3, roles: ["accountant"] },
  { titleKey: "nav.myChildren", href: "/dashboard/my-children", icon: GraduationCap, roles: ["guardian"] },
  { titleKey: "nav.myFees", href: "/dashboard/my-fees", icon: Wallet, roles: ["guardian"] },
  { titleKey: "nav.reports", href: "/dashboard/reports", icon: BarChart3, roles: ["super_admin", "madrasa_admin"] },
  { titleKey: "nav.profile", href: "/dashboard/profile", icon: User, roles: ["teacher", "accountant", "guardian"] },
  { titleKey: "nav.settings", href: "/dashboard/settings", icon: Settings, roles: ["super_admin", "madrasa_admin"] },
];

export function getNavForRole(role: UserRole): NavItem[] {
  return navigationItems.filter((item) => item.roles.includes(role));
}

export const publicNavLinks = [
  { href: "/", titleKey: "nav.home" },
  { href: "/about", titleKey: "nav.about" },
  { href: "/programs", titleKey: "nav.programs" },
  { href: "/teachers", titleKey: "nav.teachers" },
  { href: "/notices", titleKey: "nav.notices" },
  { href: "/events", titleKey: "nav.events" },
  { href: "/gallery", titleKey: "nav.gallery" },
  { href: "/contact", titleKey: "nav.contact" },
] as const;
