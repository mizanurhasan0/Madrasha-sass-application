"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Building2,
  Calculator,
  GraduationCap,
  Loader2,
  Shield,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { demoAccounts } from "@/config/site";
import { useAuth } from "@/lib/auth/auth-provider";
import { useT } from "@/lib/i18n/locale-provider";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types/user";

const loginSchema = z.object({
  emailOrPhone: z
    .string()
    .min(1, "Email or phone number is required")
    .refine(
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^[\d+\-\s()]{7,}$/.test(value),
      "Enter a valid email address or phone number"
    ),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const demoRoleKeys: Record<(typeof demoAccounts)[number]["role"], UserRole> = {
  "Super Admin": "super_admin",
  "Madrasa Admin": "madrasa_admin",
  Teacher: "teacher",
  Accountant: "accountant",
  Guardian: "guardian",
};

const roleIcons = {
  super_admin: Shield,
  madrasa_admin: Building2,
  teacher: GraduationCap,
  accountant: Calculator,
  guardian: Users,
} as const;

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/dashboard";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useT();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrPhone: "",
      password: "",
      remember: false,
    },
  });

  const remember = watch("remember");

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      const result = await login(values);
      if (result.success) {
        toast.success(t("login.success"));
        router.push(redirectTo);
        router.refresh();
      } else {
        toast.error(result.message ?? t("login.failed"));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemoAccount = (account: (typeof demoAccounts)[number]) => {
    const roleKey = demoRoleKeys[account.role];
    setValue("emailOrPhone", account.email, { shouldValidate: true });
    setValue("password", account.password, { shouldValidate: true });
    toast.info(t("login.demoFilled", { role: t(`roles.${roleKey}`) }));
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-8">
      <div className="space-y-2 text-center lg:text-left">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          {t("login.title")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("login.subtitleManage")}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="emailOrPhone">{t("login.emailOrPhone")}</Label>
          <Input
            id="emailOrPhone"
            type="text"
            placeholder={t("login.emailPlaceholder")}
            autoComplete="username"
            aria-invalid={!!errors.emailOrPhone}
            {...register("emailOrPhone")}
          />
          {errors.emailOrPhone && (
            <p className="text-xs text-destructive">{errors.emailOrPhone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">{t("login.password")}</Label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-primary hover:underline"
            >
              {t("login.forgotPassword")}
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder={t("login.passwordPlaceholder")}
            autoComplete="current-password"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="remember"
            checked={remember}
            onCheckedChange={(checked) =>
              setValue("remember", checked === true, { shouldDirty: true })
            }
          />
          <Label htmlFor="remember" className="cursor-pointer font-normal text-muted-foreground">
            {t("login.rememberMe")}
          </Label>
        </div>

        <Button type="submit" className="h-10 w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              {t("login.signingIn")}
            </>
          ) : (
            t("login.signIn")
          )}
        </Button>
      </form>

      <div className="space-y-3">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              {t("login.demoAccounts")}
            </span>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground lg:text-left">
          {t("login.demoHint")}
        </p>

        <div className="grid gap-2 sm:grid-cols-2">
          {demoAccounts.map((account) => {
            const roleKey = demoRoleKeys[account.role];
            const Icon = roleIcons[roleKey];
            return (
              <button
                key={account.role}
                type="button"
                onClick={() => fillDemoAccount(account)}
                className={cn(
                  "group flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5 text-left transition-all",
                  "hover:border-primary/40 hover:bg-primary/5 hover:shadow-sm",
                  "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                )}
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-foreground">
                    {t(`roles.${roleKey}`)}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {account.email}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
