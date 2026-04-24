import * as React from "react";
import { cn } from "../lib/utils.js";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./table.js";

export interface DataTableColumn<T> {
  /** Unique key matching a property on T, or a custom accessor */
  key: string;
  /** Header label */
  header: string;
  /** Optional render override */
  render?: (row: T, index: number) => React.ReactNode;
  /** Optional className for the header cell */
  headerClassName?: string;
  /** Optional className for the body cells */
  cellClassName?: string;
}

export interface DataTableProps<T extends Record<string, unknown>>
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Column definitions */
  columns: Array<DataTableColumn<T>>;
  /** Row data */
  data: T[];
  /** Optional toolbar slot (filters, search, actions) */
  toolbar?: React.ReactNode;
  /** Optional row key accessor — defaults to `id` if present, else index */
  getRowKey?: (row: T, index: number) => string | number;
  /** Empty state message */
  emptyMessage?: string;
  /** Empty state slot — overrides emptyMessage */
  emptySlot?: React.ReactNode;
}

function DataTable<T extends Record<string, unknown>>({
  className,
  columns,
  data,
  toolbar,
  getRowKey,
  emptyMessage = "No results.",
  emptySlot,
  ...props
}: DataTableProps<T>) {
  const resolveKey = (row: T, index: number): string | number => {
    if (getRowKey) return getRowKey(row, index);
    if ("id" in row && (typeof row["id"] === "string" || typeof row["id"] === "number"))
      return row["id"] as string | number;
    return index;
  };

  return (
    <div className={cn("rounded-card border border-border overflow-hidden", className)} {...props}>
      {toolbar && (
        <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-3">
          {toolbar}
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key} className={col.headerClassName}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-sand-9"
              >
                {emptySlot ?? emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow key={resolveKey(row, index)}>
                {columns.map((col) => (
                  <TableCell key={col.key} className={col.cellClassName}>
                    {col.render
                      ? col.render(row, index)
                      : (row[col.key] as React.ReactNode)}
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
DataTable.displayName = "DataTable";

export { DataTable };
