import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ColumnAlign = "left" | "center" | "right";

export type SimpleTableColumn<T> = {
  key: string;
  header: string;
  align?: ColumnAlign;
  cell: (row: T) => React.ReactNode;
  headerClassName?: string;
  cellClassName?: string;
};

type SimpleTableProps<T> = {
  columns: SimpleTableColumn<T>[];
  data: T[];
  getRowKey: (row: T) => string;
  className?: string;
  footer?: React.ReactNode;
};

const alignClass: Record<ColumnAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function SimpleTable<T>({
  columns,
  data,
  getRowKey,
  className,
  footer,
}: SimpleTableProps<T>) {
  return (
    <div className={cn("overflow-hidden rounded-xl border", className)}>
      <Table>
        <TableHeader>
          <TableRow className="border-b bg-muted/40 hover:bg-muted/40">
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={cn(
                  "px-4 py-3 font-medium",
                  alignClass[column.align ?? "left"],
                  column.headerClassName
                )}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={getRowKey(row)}>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  className={cn(
                    "px-4 py-3",
                    alignClass[column.align ?? "left"],
                    column.cellClassName
                  )}
                >
                  {column.cell(row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        {footer ? <TableFooter>{footer}</TableFooter> : null}
      </Table>
    </div>
  );
}
