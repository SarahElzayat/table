import React from "react";
import dataJSON from "./MOCK_DATA.json";
import { columnDefWithFilters } from "./columns";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import "./table.css";
import { DebouncedInput } from "./DebouncedInput";
import Filter from "./FilterFunction";

const ColumnFilteringTable = () => {
  const finalData = React.useMemo(() => dataJSON, []);
  const finalColumns = React.useMemo(() => columnDefWithFilters, []);
  const defaultColumn = React.useMemo(() => {
    return {
      enableColumnFilter: false,
    };
  }, []);
  const [columnFilters, setColumnFilters] = React.useState([]);

  const tableInstance = useReactTable({
    columns: finalColumns,
    data: finalData,
    defaultColumn: defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters: columnFilters, // state binding
    },
    onColumnFiltersChange: setColumnFilters,
  });

  // console.log("====================================");
  // console.log("test", columnDef);
  // console.log("test", tableInstance.getHeaderGroups());
  // console.log("====================================");
  return (
    <>
      {/* <DebouncedInput
        value={filtering ?? ""}
        onChange={(value) => setFiltering(String(value))}
        placeholder={"Search..."}
      /> */}
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerEl) => {
            // table row
            return (
              <tr key={headerEl.id}>
                {headerEl.headers.map((columnEl) => {
                  console.log("col el", columnEl);
                  return (
                    <th key={columnEl.id} colSpan={columnEl.colSpan}>
                      {columnEl.isPlaceholder ? null : (
                        <>
                          {flexRender(
                            columnEl.column.columnDef.header,
                            columnEl.getContext()
                          )}
                          {columnEl.column.getCanFilter() ? (
                            <div>
                              <Filter
                                column={columnEl.column}
                                table={tableInstance}
                              />
                            </div>
                          ) : null}
                        </>
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

export default ColumnFilteringTable;
