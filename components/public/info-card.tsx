import { cn } from "@/lib/utils";

type InfoCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function InfoCard({ children, className }: InfoCardProps) {
  return (
    <div className={cn("rounded-2xl border border-border/60 bg-card p-6 shadow-soft", className)}>
      {children}
    </div>
  );
}
