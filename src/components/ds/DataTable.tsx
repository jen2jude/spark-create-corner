import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Text } from "./typography";

export type Column<Row> = {
  key: string;
  header: string;
  align?: "left" | "right" | undefined;
  width?: string | undefined;
  cell: (row: Row) => ReactNode;
};

/**
 * Restrained data table: hairline rules, no zebra stripes, numbers right-aligned.
 * Always captioned for screen readers.
 */
export function DataTable<Row>({
  caption,
  columns,
  rows,
  getRowId,
  empty = "Nothing here yet.",
  className,
}: {
  caption: string;
  columns: ReadonlyArray<Column<Row>>;
  rows: ReadonlyArray<Row>;
  getRowId: (row: Row, index: number) => string;
  empty?: string | undefined;
  className?: string | undefined;
}) {
  return (
    <div className={cn("overflow-x-auto rounded-xl border border-border bg-card", className)}>
      <Table>
        <caption className="sr-only">{caption}</caption>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {columns.map((c) => (
              <TableHead
                key={c.key}
                style={c.width ? { width: c.width } : undefined}
                className={cn(
                  "text-[0.625rem] font-medium uppercase tracking-[0.18em] text-muted-foreground",
                  c.align === "right" && "text-right",
                )}
              >
                {c.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="py-10 text-center">
                <Text variant="muted">{empty}</Text>
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, i) => (
              <TableRow key={getRowId(row, i)}>
                {columns.map((c) => (
                  <TableCell
                    key={c.key}
                    className={cn("text-sm text-foreground", c.align === "right" && "text-right tabular-nums")}
                  >
                    {c.cell(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
