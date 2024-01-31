import React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DebouncedInput } from "./DebouncedInput";
import "./table.css";
import Filter from "./FilterFunction";
import PopupMenu from "./PopupMenu";

const FinalTable = ({
  data,
  columns,
  selectedRows,
  setSelectedRows,
  total,
  search,
  sort,
  getData,
  // filtering,
  // setFiltering,
  // sorting,
  // setSorting,
  // nextPage,
  // previousPage,
  // firstPage,
  // lastPage,
  // getPage,
  // currentPage,
  // pageSize,
  selectRows = false,
  manualSorting = false,
  pageSizeOptions = [10, 20, 30, 40, 50, 100],
}) => {
  const finalData = React.useMemo(() => data, [data]);
  const finalColumns = React.useMemo(() => columns, []);
  const [columnOrder, setColumnOrder] = React.useState(
    finalColumns.map((col) => col.id)
  );
  const [columnVisibility, setColumnVisibility] = React.useState({});
  //   const [selectedRows, setSelectedRows] = React.useState({});
  //   const [filtering, setFiltering] = React.useState("");
  const [sorting, setSorting] = React.useState();
  // const [columnFilters, setColumnFilters] = React.useState([]);
  const defaultColumn = React.useMemo(() => {
    return {
      enableColumnFilter: true,
    };
  }, []);

  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: pageSizeOptions[0],
  });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const tableInstance = useReactTable({
    columns: finalColumns,
    data: finalData,
    defaultColumn: defaultColumn,
    pageCount: Math.ceil(total / pageSize),
    manualPagination: true,
    manualSorting: manualSorting,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    // getSortedRowModel: getSortedRowModel(),
    getRowId: (row) => row.id,
    state: {
      rowSelection: selectedRows,
      columnOrder: columnOrder,
      columnVisibility: columnVisibility,

      // globalFilter: filtering,
      sorting: sorting,
      // columnFilters: columnFilters,
      // pagination: {
      //   pageIndex: 0,
      //   pageSize: pageSizeOptions[0],
      // },
      pagination: pagination,
    },
    onRowSelectionChange: setSelectedRows,
    enableRowSelection: true,
    onColumnOrderChange: setColumnOrder,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,

    // onGlobalFilterChange: setFiltering,
    onSortingChange: setSorting,
    // onColumnFiltersChange: setColumnFilters,
  });

  // get page with page index and page size when the page index or page size changes
  React.useEffect(() => {
    // debugger;
    getData(pageIndex, pageSize);
  }, [pageIndex, pageSize]);

  return (
    <>
      <br />
      <hr />
      <div>
        <h6>{JSON.stringify(pagination)}</h6>
        <label>
          Toggle All Columns Visibility:{" "}
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
            selectRows && (
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
            )
          );
        })}
      </div>
      <hr />
      <hr />
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerEl) => {
            // table row
            return (
              <tr key={headerEl.id}>
                {headerEl.headers.map((columnEl) => {
                  if (
                    columnEl.id !== "select" ||
                    (columnEl.id == "select" && selectRows)
                  ) {
                    return (
                      <th key={columnEl.id} colSpan={columnEl.colSpan}>
                        {
                          <>
                            <div
                              style={{
                                flexDirection: "row",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {columnEl.isPlaceholder
                                ? null
                                : flexRender(
                                    columnEl.column.columnDef.header,
                                    columnEl.getContext()
                                  )}

                              {columnEl.id != "select" && (
                                <PopupMenu
                                  options={[
                                    ...(columnEl.column.getCanSort()
                                      ? [
                                          {
                                            label: "Sort Ascending",
                                            action: () => {
                                              if (manualSorting) {
                                                sort(
                                                  columnEl.id,
                                                  "asc",
                                                  pageSize
                                                );
                                              } else {
                                                tableInstance.setSorting({
                                                  id: columnEl.id,
                                                  desc: false,
                                                });
                                              }
                                            },
                                          },
                                          {
                                            label: "Sort Descending",
                                            action: () => {
                                              if (manualSorting) {
                                                sort(
                                                  columnEl.id,
                                                  "desc",
                                                  pageSize
                                                );
                                              } else {
                                                // alert('test')
                                                console.log(
                                                  "test",
                                                  tableInstance
                                                );
                                                tableInstance.setSorting({
                                                  id: columnEl.id,
                                                  desc: true,
                                                });
                                              }
                                            },
                                          },
                                          {
                                            label: "Remove Sort",
                                            action: () => {
                                              getData(pageSize);
                                            },
                                          },
                                        ]
                                      : []),

                                    {
                                      label: "Move Left",
                                      action: () => {
                                        // change the order of the columns

                                        // get the index of the column
                                        const index =
                                          tableInstance.options.state.columnOrder.findIndex(
                                            (col) => col == columnEl.id
                                          );

                                        console.log(index);
                                        // get the current order of the columns
                                        const currentOrder = [
                                          ...tableInstance.options.state
                                            .columnOrder,
                                        ];
                                        //   alert(currentOrder);
                                        console.log("old order", currentOrder);

                                        // if the index of the column is not 1, then move the column to the left
                                        if (index !== 1) {
                                          // get the column to the left
                                          const leftColumn =
                                            currentOrder[index - 1];

                                          // swap the column with the column to the left
                                          currentOrder[index - 1] = columnEl.id;
                                          currentOrder[index] = leftColumn;

                                          console.log(
                                            "new order",
                                            currentOrder
                                          );

                                          // set the new column order
                                          tableInstance.setColumnOrder(
                                            currentOrder
                                          );
                                        }
                                      },
                                    },
                                    {
                                      label: "Move Right",
                                      action: () => {
                                        // change the order of the columns

                                        // get the index of the column
                                        const index =
                                          tableInstance.options.state.columnOrder.findIndex(
                                            (col) => col == columnEl.id
                                          );
                                        // get the current order of the columns
                                        const currentOrder = [
                                          ...tableInstance.options.state
                                            .columnOrder,
                                        ];
                                        //   alert(currentOrder);
                                        console.log("old order", currentOrder);

                                        // if the index of the column is not 0, then move the column to the left
                                        if (index !== currentOrder.length - 1) {
                                          // get the column to the left
                                          const rightColumn =
                                            currentOrder[index + 1];

                                          // swap the column with the column to the right
                                          currentOrder[index + 1] = columnEl.id;
                                          currentOrder[index] = rightColumn;

                                          console.log(
                                            "new order",
                                            currentOrder
                                          );

                                          // set the new column order
                                          tableInstance.setColumnOrder(
                                            currentOrder
                                          );
                                        }
                                      },
                                    },
                                  ]}
                                />
                              )}
                            </div>
                            {columnEl.column.getCanFilter() ? (
                              <div>
                                {/* <Filter
                                    column={columnEl.column}
                                    table={tableInstance}
                                  /> */}
                                {/* <h6>{columnEl.id}</h6> */}
                                <DebouncedInput
                                  debounce={500}
                                  placeholder={"Search..."}
                                  value={columnEl.column.getFilterValue() ?? ""}
                                  onChange={(value) => {
                                    // console.log(columnEl);
                                    // check if the value is empty
                                    if (value == "") {
                                      // remove the filter
                                      // columnEl.column.clearFilter();
                                      columnEl.column.setFilterValue(value);
                                      getData(pageSize);
                                    } else {
                                      columnEl.column.setFilterValue(value);
                                      search(columnEl.id, value, pageSize);
                                    }
                                  }}
                                />
                              </div>
                            ) : null}
                          </>
                        }
                      </th>
                    );
                  }
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
                  if (
                    cellEl.column.id !== "select" ||
                    (cellEl.column.id == "select" && selectRows)
                  ) {
                    return (
                      <td key={cellEl.id}>
                        {flexRender(
                          cellEl.column.columnDef.cell,
                          cellEl.getContext()
                        )}
                        {/* <h6>{rowEl.id}</h6> */}
                      </td>
                    );
                  }
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
      <div>Total Results: {total}</div>
      <hr />
      <div>
        Selected Rows: {tableInstance.getSelectedRowModel().rows.length}
        <br />
        Selected Rows: {JSON.stringify(selectedRows)}
      </div>
      <hr />
      <div>
        <button
          // onClick={() => getPage(firstPage)}
          // disabled={!tableInstance.getCanPreviousPage()}
          // disabled={currentPage == 1}
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
          onClick={() => {
            tableInstance.nextPage();
          }}
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
        Page {tableInstance.getState().pagination.pageIndex + 1} of{" "}
        {tableInstance.getPageCount()}
      </div>
      <hr />
      Go to page:{" "}
      <input
        type="number"
        defaultValue={1}
        min={1}
        max={tableInstance.getPageCount()}
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
          value={
            tableInstance.getState().pagination.pageSize ?? pageSizeOptions[0]
          }
          onChange={(e) => {
            // tableInstance.setPageSize(Number(e.target.value));
            tableInstance.setPageSize(Number(e.target.value));
          }}
        >
          {pageSizeOptions.map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
      <br />
    </>
  );
};

export default FinalTable;
