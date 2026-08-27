import type { LoginCredentials, SessionPayload } from "@/types/user";
import { DEMO_PASSWORD, mockUsers } from "@/data/users";
import { generateId, simulateLatency, success, failure } from "./base.service";

export const authService = {
  async login(credentials: LoginCredentials) {
    await simulateLatency(500);
    const { emailOrPhone, password } = credentials;

    const user = mockUsers.find(
      (u) =>
        u.email.toLowerCase() === emailOrPhone.toLowerCase() ||
        u.phone === emailOrPhone
    );

    if (!user || password !== DEMO_PASSWORD) {
      return failure("Invalid email/phone or password");
    }

    const session: SessionPayload = {
      sub: user.id,
      role: user.role,
      madrasaId: user.madrasaId,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };

    return success(session);
  },

  async getCurrentUser(): Promise<SessionPayload | null> {
    await simulateLatency(100);
    return null;
  },

  async logout() {
    await simulateLatency(100);
    return success(null);
  },
};
