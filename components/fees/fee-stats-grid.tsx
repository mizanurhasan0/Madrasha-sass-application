import { ClipboardList, TrendingUp, Wallet } from "lucide-react";
import { StatCard } from "@/components/common/stat-card";

export type FeeStats = {
  totalCollection: number;
  totalDue: number;
  todayCollection: number;
  monthlyCollection: number;
};

type FeeStatsGridProps = {
  stats: FeeStats;
};

export function FeeStatsGrid({ stats }: FeeStatsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Collection"
        value={stats.totalCollection}
        isCurrency
        icon={<Wallet className="size-5" />}
      />
      <StatCard
        title="Total Due"
        value={stats.totalDue}
        isCurrency
        icon={<ClipboardList className="size-5" />}
      />
      <StatCard
        title="Today's Collection"
        value={stats.todayCollection}
        isCurrency
        icon={<TrendingUp className="size-5" />}
      />
      <StatCard
        title="Monthly Collection"
        value={stats.monthlyCollection}
        isCurrency
        icon={<Wallet className="size-5" />}
      />
    </div>
  );
}
