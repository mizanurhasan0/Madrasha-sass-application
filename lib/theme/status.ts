import { cva, type VariantProps } from "class-variance-authority";

export type StatusVariant = "success" | "warning" | "danger" | "info" | "neutral";

const STATUS_VARIANT: Record<string, StatusVariant> = {
  active: "success",
  paid: "success",
  present: "success",
  pass: "success",
  completed: "success",
  pending: "warning",
  partial: "warning",
  late: "warning",
  ongoing: "warning",
  due: "warning",
  suspended: "danger",
  absent: "danger",
  overdue: "danger",
  fail: "danger",
  leave: "info",
  upcoming: "info",
  inactive: "neutral",
};

export function getStatusVariant(status: string): StatusVariant {
  return STATUS_VARIANT[status] ?? "neutral";
}

export const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
  {
    variants: {
      variant: {
        success: "bg-status-success-bg text-status-success-fg",
        warning: "bg-status-warning-bg text-status-warning-fg",
        danger: "bg-status-danger-bg text-status-danger-fg",
        info: "bg-status-info-bg text-status-info-fg",
        neutral: "bg-status-neutral-bg text-status-neutral-fg",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

export const statusSurfaceVariants = cva("rounded-lg p-3", {
  variants: {
    variant: {
      success: "bg-status-success-bg",
      warning: "bg-status-warning-bg",
      danger: "bg-status-danger-bg",
      info: "bg-status-info-bg",
      neutral: "bg-status-neutral-bg",
    },
  },
  defaultVariants: {
    variant: "neutral",
  },
});

export const statusValueVariants = cva("text-xl font-bold", {
  variants: {
    variant: {
      success: "text-status-success-fg",
      warning: "text-status-warning-fg",
      danger: "text-status-danger-fg",
      info: "text-status-info-fg",
      neutral: "text-status-neutral-fg",
    },
  },
  defaultVariants: {
    variant: "neutral",
  },
});

export type StatusBadgeVariantProps = VariantProps<typeof statusBadgeVariants>;
