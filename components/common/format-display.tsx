import { formatCurrency, formatDate } from "@/lib/format";

export function Money({ amount }: { amount: number }) {
  return <span className="font-medium tabular-nums">{formatCurrency(amount)}</span>;
}

export function DateDisplay({ date, pattern }: { date: string; pattern?: string }) {
  return <span className="tabular-nums">{formatDate(date, pattern)}</span>;
}
