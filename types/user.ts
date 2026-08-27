export type UserRole =
  | "super_admin"
  | "madrasa_admin"
  | "teacher"
  | "accountant"
  | "guardian";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  madrasaId?: string;
  password?: string;
  status: "active" | "inactive";
  createdAt: string;
};

export type SessionPayload = {
  sub: string;
  role: UserRole;
  madrasaId?: string;
  exp: number;
  name: string;
  email: string;
  avatar?: string;
};

export type LoginCredentials = {
  emailOrPhone: string;
  password: string;
  remember?: boolean;
};
