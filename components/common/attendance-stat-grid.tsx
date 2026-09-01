import { cn } from "@/lib/utils";
import {
  statusSurfaceVariants,
  statusValueVariants,
  type StatusVariant,
} from "@/lib/theme/status";

type AttendanceCounts = {
  present: number;
  absent: number;
  late: number;
  leave: number;
};

type AttendanceStatGridProps = {
  attendance: AttendanceCounts;
  className?: string;
};

const items: { label: string; key: keyof AttendanceCounts; variant: StatusVariant }[] = [
  { label: "Present", key: "present", variant: "success" },
  { label: "Absent", key: "absent", variant: "danger" },
  { label: "Late", key: "late", variant: "warning" },
  { label: "Leave", key: "leave", variant: "info" },
];

export function AttendanceStatGrid({ attendance, className }: AttendanceStatGridProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-3 text-sm", className)}>
      {items.map((item) => (
        <div key={item.key} className={statusSurfaceVariants({ variant: item.variant })}>
          <p className="text-muted-foreground">{item.label}</p>
          <p className={statusValueVariants({ variant: item.variant })}>{attendance[item.key]}</p>
        </div>
      ))}
    </div>
  );
}
