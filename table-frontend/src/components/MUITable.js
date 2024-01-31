import React from "react";
import dataJSON from "./MOCK_DATA.json";
import { columnDefWithCheckBox } from "./columns";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import "./table.css";

const MUITable = () => {
  const finalData = React.useMemo(() => dataJSON, []);
  const finalColumns = React.useMemo(() => columnDefWithCheckBox, []);
  const [selectedRows, setSelectedRows] = React.useState({});
  const [columnOrder, setColumnOrder] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});

  const tableInstance = useReactTable({
    columns: finalColumns,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      rowSelection: selectedRows,
      columnOrder: columnOrder,
      columnVisibility: columnVisibility,
    },
    onRowSelectionChange: setSelectedRows,
    onColumnOrderChange: setColumnOrder,
    onColumnVisibilityChange: setColumnVisibility,
    enableRowSelection: true,
  });

  // console.log("====================================");
  // console.log("test", columnDef);
  // console.log("test", tableInstance.getHeaderGroups());
  // console.log("====================================");
  return (
    <>
      <button onClick={() => setColumnOrder(["date"])}>Change Order</button>
      <div>
        <label>
          Toggle Columns Visibility:{" "}
          <input
            {...{
              type: "checkbox",
              checked: tableInstance.getIsAllColumnsVisible(),
              onChange: tableInstance.getToggleAllColumnsVisibilityHandler(),
            }}
          />
        </label>
        <hr />

        {tableInstance.getAllLeafColumns().map((columnEl) => {
          return (
            <label key={columnEl.id}>
              <input
                {...{
                  type: "checkbox",
                  checked: columnEl.getIsVisible(),
                  onChange: columnEl.getToggleVisibilityHandler(),
                }}
              />
              {columnEl.columnDef.header}
            </label>
          );
        })}
      </div>
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
                      {/* <label key={columnEl.id}>
                        <input
                          {...{
                            type: "checkbox",
                            checked: columnEl.column.getIsVisible(),
                            onChange:
                              columnEl.column.getToggleVisibilityHandler(),
                          }}
                        />
                      </label> */}
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
      <hr />
      {/* <ul>
        {tableInstance.getSelectedRowModel().flatRows.map((el) => {
          return <li key={el.id}>{JSON.stringify(el.original)}</li>;
        })}
      </ul> */}

      <div>
        Selected Rows: {tableInstance.getSelectedRowModel().flatRows.length}
      </div>
      <hr />
      <div>
        <button
          onClick={() => tableInstance.setPageIndex(0)}
          disabled={!tableInstance.getCanPreviousPage()}
        >
          {"<<"}
        </button>{" "}
        <button
          onClick={() => tableInstance.previousPage()}
          disabled={!tableInstance.getCanPreviousPage()}
        >
          {"<"}
        </button>{" "}
        <button
          onClick={() => tableInstance.nextPage()}
          disabled={!tableInstance.getCanNextPage()}
        >
          {">"}
        </button>{" "}
        <button
          onClick={() =>
            tableInstance.setPageIndex(tableInstance.getPageCount() - 1)
          }
          disabled={!tableInstance.getCanNextPage()}
        >
          {">>"}
        </button>
      </div>
      <hr />
      <div>
        Page {tableInstance.options.state.pagination.pageIndex + 1} of{" "}
        {tableInstance.getPageCount()}
      </div>
      <hr />
      <input
        type="number"
        defaultValue={1}
        onChange={(e) => {
          tableInstance.setPageIndex(
            Number(e.target.value) - 1 <= tableInstance.getPageCount()
              ? Number(e.target.value) - 1
              : tableInstance.getPageCount() - 1
          );
        }}
      ></input>
      <hr />
      <div>
        Page Size:{" "}
        <select
          value={tableInstance.options.state.pagination.pageSize}
          onChange={(e) => {
            tableInstance.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default MUITable;
