import React from "react";
import dataJSON from "./MOCK_DATA.json";
import { columnDef } from "./columns";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import "./table.css";
import { DebouncedInput } from "./DebouncedInput";

const GlobalFilteringTable = () => {
  const finalData = React.useMemo(() => dataJSON, []);
  const finalColumns = React.useMemo(() => columnDef, []);
  const [filtering, setFiltering] = React.useState("");

  const tableInstance = useReactTable({
    columns: finalColumns,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering, // state binding
    },
    onGlobalFilterChange: setFiltering,
  });

  // console.log("====================================");
  // console.log("test", columnDef);
  // console.log("test", tableInstance.getHeaderGroups());
  // console.log("====================================");
  return (
    <>
      <DebouncedInput
        value={filtering ?? ""}
        onChange={(value) => setFiltering(String(value))}
        placeholder={"Search..."}
      />
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerEl) => {
            // table row
            return (
              <tr key={headerEl.id}>
                {headerEl.headers.map((columnEl) => {
                  return (
                    <th key={columnEl.id} colSpan={columnEl.colSpan}>
                      {columnEl.isPlaceholder
                        ? null
                        : flexRender(
                            columnEl.column.columnDef.header,
                            columnEl.getContext()
                          )}
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

export default GlobalFilteringTable;
