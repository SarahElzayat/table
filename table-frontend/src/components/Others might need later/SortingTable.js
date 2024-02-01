import React, { useState } from "react";
import dataJSON from "../MOCK_DATA.json";
import { columnDefSorting } from "../columns";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";
import "./table.css";
const SortingTable = () => {
  const finalData = React.useMemo(() => dataJSON, []);
  const finalColumns = React.useMemo(() => columnDefSorting, []);
  const [sorting, setSorting] = useState();

  const tableInstance = useReactTable({
    columns: finalColumns,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting, // state binding
    },
    onSortingChange: setSorting,
  });

  // console.log("====================================");
  // console.log("test", columnDef);
  // console.log("test", tableInstance.getHeaderGroups());
  // console.log("====================================");
  return (
    <>
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerEl) => {
            // table row
            return (
              <tr key={headerEl.id}>
                {headerEl.headers.map((columnEl) => {
                  return (
                    <th
                      key={columnEl.id}
                      colSpan={columnEl.colSpan}
                      onClick={columnEl.column.getToggleSortingHandler()}
                    >
                      {columnEl.isPlaceholder
                        ? null
                        : flexRender(
                            columnEl.column.columnDef.header,
                            columnEl.getContext()
                          )}
                      {
                        {
                          asc: "↑", // ascending
                          desc: "↓", // descending
                        }[columnEl.column.getIsSorted() ?? null]
                      }
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>

        <tbody>
          {tableInstance.getRowModel().rows.map((rowEl) => {
            return (
              <tr key={rowEl.id}>
                {rowEl.getVisibleCells().map((cellEl) => {
                  return (
                    <td key={cellEl.id}>
                      {flexRender(
                        cellEl.column.columnDef.cell,
                        cellEl.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        {/* <tfoot>
          {tableInstance.getFooterGroups().map((footerEl) => {
            return (
              <tr key={footerEl.id}>
                {footerEl.headers.map((columnEl) => {
                  return (
                    <th key={columnEl.id} colSpan={columnEl.colSpan}>
                      {flexRender(
                        columnEl.column.columnDef.footer,
                        columnEl.getContext()
                      )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </tfoot> */}
      </table>
    </>
  );
};

export default SortingTable;
