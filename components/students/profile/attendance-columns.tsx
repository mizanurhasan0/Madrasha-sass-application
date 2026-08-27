import { StatusBadge } from "@/components/common/status-badge";
import { DateDisplay } from "@/components/common/format-display";
import type { Column } from "@/components/common/data-table";
import type { AttendanceRecord } from "@/types/attendance";

export function getAttendanceColumns(t: (key: string) => string): Column<AttendanceRecord>[] {
  return [
    {
      key: "date",
      header: t("common.date"),
      cell: (row) => <DateDisplay date={row.date} />,
    },
    {
      key: "status",
      header: t("common.status"),
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "note",
      header: "Note",
      cell: (row) => row.note ?? "—",
      className: "hidden sm:table-cell",
    },
  ];
}
