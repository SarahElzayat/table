import React from "react";
import { flexRender } from "@tanstack/react-table";
import { DebouncedInput } from "./DebouncedInput";
import "./table.css";
import PopupMenu from "./PopupMenu";
import { IoMdAddCircle } from "react-icons/io";
import { CustomTableLogic } from "./CustomTableLogic";

/**
 * CustomTable is a highly configurable component for displaying tabular data with features like sorting, filtering, pagination, and column visibility control.
 *
 * @component
 * @example
 * const columns = [{ id: 'id', header: 'ID' }, { id: 'name', header: 'Name' }];
 * const data = [{ id: 1, name: 'John Doe' }];
 * return (
 *   <CustomTable
 *     data={data}
 *     columns={columns}
 *     total={data.length}
 *     getData={() => {}}
 *   />
 * );
 *
 * @param {data} {required} the table data to be displayed in the form of an array, with rows as objects, each field in must have the key respective to its column id
 * @param {columns} {required} an array of objects, each object represents a column header. Each object must have an id field with the key "id" and it must match the respective key of the row, and a header with a key "header" that shows the value/component that's going to be displayed.
 * @param {selectRows} {optional, default = false} to enable rows selection, this argument must be true.
 * @param {selectedRows} {required if selectRows is passed as true} a state that needs to be maintained, initialized with an empty object "{}", the selected rows holds the id's of the selected rows.
 * @param {setSelectedRows} {required if selectRows is passed as true} a setter for the selectedRows state.
 * @param {total} {required} the total number of records to be displayed in all pages.
 * @param {customFilters} {required if filtering is needed, and "type" must be added to any column that's need to appear in the filters} a state that needs to be maintained, initialized as an empty array "[]", each filter added to the array is in the form of an object with they keys ("id", "operator", "value"). eg: {id: "first_name", operator:"equals", value: "John Doe"}.
 * @param {setCustomFilters} {required if filtering is needed} a setter for the customFilters state.
 * @param {customSorting} {required if sorting is needed} a state that needs to be maintained, initialized as an empty array "[]", each sorting filter added to the array is in the form of an object with they keys ("id", "order"). The order is either "asc" or "desc" eg: {id: "first_name", order:"desc"}.
 * @param {setCustomSorting} {required if sorting is needed} a setter for the customSorting state.
 * @param {getData} {required} the function to fetch your data. A "props" argument needs to be passed, it holds the current page size and page index. This function is called upon loading the table and pressing "Apply" if the apply button is visible.
 * @param {loading} {optional, default = false}  if you want to show a loading spinner, maintain this state
 * @param {columnSorting} {optional, default = false} to sort columns "VISIBLE" data, this argument needs to be passed as true @NOTE this type of sorting is done at the client's side
 * @param {pageSizeOptions} {optional, default = [10, 20, 30, 40, 50, 100]} an array of numbers that represent the page size options
 * @param {selectionKey} {optional, default = "select"} the key of the column that's used for selection with checkboxes
 * @param {showOrHideColumns} {optional, default = true} to display the show/hide columns checkboxes
 * @returns
 */
const CustomTable = ({
  // The dataset to be rendered in the table, where each object represents a row.
  data,

  // Defines the table's columns, including id for matching data keys and header for column labels.
  columns,

  // State for tracking selected rows, required if row selection is enabled.
  selectedRows,

  // Function to update the `selectedRows` state.
  setSelectedRows,

  // Total number of records, useful for pagination and displaying total count.
  total,

  // State for managing custom filters, each object includes `id`, `operator`, and `value`.
  customFilters,

  // Function to update the `customFilters` state.
  setCustomFilters,

  // State for managing custom sorting, each object includes `id` and `order`.
  customSorting,

  // Function to update the `customSorting` state.
  setCustomSorting,

  // Function to fetch data based on pagination, sorting, and filtering state.
  getData,

  // Indicates whether data is being loaded, used for displaying a loading indicator.
  loading = false,

  // Enables row selection functionality, allowing rows to be selected by the user.
  selectRows = false,

  // Enables client-side column sorting.
  columnSorting = false,

  // Specifies available page size options for pagination.
  pageSizeOptions = [10, 20, 30, 40, 50, 100],

  // Key used to identify the selection column when row selection is enabled.
  selectionKey = "select",

  // Allows users to show or hide columns via checkboxes.
  showOrHideColumns = true,
}) => {
  const {
    finalColumns,
    pageIndex,
    pageSize,
    tableInstance,
    popupFilterVisible,
    setPopupFilterVisible,
    popupFilter,
    setPopupFilter,
    sortingVisible,
    setSortingVisible,
    sortingColumn,
    setSortingColumn,
    handleAddSorting,
    handleCloseSorting,
    handleRemoveSorting,
    handleAddFilter,
    handleRemoveFilter,
  } = CustomTableLogic({
    data,
    columns,
    selectRows,
    selectedRows,
    setSelectedRows,
    total,
    customFilters,
    setCustomFilters,
    customSorting,
    setCustomSorting,
    getData,
    columnSorting,
    pageSizeOptions,
  });

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
              }}
            >
              {customSorting != undefined && (
                <button onClick={() => setSortingVisible(!sortingVisible)}>
                  ↑↓
                </button>
              )}

              {sortingVisible && (
                <div
                  style={{
                    backgroundColor: "rgba(150,150,150 ,0.9)",
                    position: "absolute",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    left: 0,
                    top: "100%",
                  }}
                >
                  <select
                    onChange={(e) => {
                      setSortingColumn({
                        id: e.target.value,
                        order: null,
                      });
                    }}
                  >
                    <option value="" selected disabled hidden>
                      Choose Column
                    </option>

                    {/* get the options from the table's headers & check if the can sort*/}
                    {tableInstance.getAllLeafColumns().map((columnEl) => {
                      if (columnEl.getCanSort())
                        return (
                          <option key={columnEl.id} value={columnEl.id}>
                            {columnEl.columnDef.header}
                          </option>
                        );
                    })}
                  </select>
                  <select
                    onChange={(e) => {
                      // alert(e.target.value);
                      setSortingColumn({
                        ...sortingColumn,
                        order: e.target.value,
                      });
                    }}
                  >
                    <option value="" selected disabled hidden>
                      Choose Order
                    </option>

                    {/* only ascending and descending options */}
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                  <button onClick={handleAddSorting}>+</button>
                  <button onClick={handleCloseSorting}>X</button>
                </div>
              )}
            </div>
            <div style={{ width: 10 }}></div>
            <div style={{ position: "relative", display: "flex" }}>
              {customFilters != undefined && (
                <button
                  onClick={() => setPopupFilterVisible(!popupFilterVisible)}
                >
                  <IoMdAddCircle size={25} color="#3F51B5" />
                </button>
              )}
              {popupFilterVisible && (
                <div
                  style={{
                    backgroundColor: "rgba(150,150,150 ,0.9)",
                    position: "absolute",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    left: 0,
                    top: "100%",
                  }}
                >
                  <select
                    onChange={(e) => {
                      setPopupFilter({
                        id: e.target.value,
                      });
                    }}
                  >
                    <option value="" selected disabled hidden>
                      Choose Column
                    </option>
                    {finalColumns.map((columnEl) => {
                      if (columnEl?.type)
                        return (
                          <option key={columnEl.id} value={columnEl.id}>
                            {columnEl.header}
                          </option>
                        );
                    })}
                  </select>
                  <select
                    onChange={(e) => {
                      setPopupFilter({
                        ...popupFilter,
                        operator: e.target.value,
                      });
                    }}
                  >
                    <option value="" selected disabled hidden>
                      Choose Operator
                    </option>

                    {/* show the operators based on the chosen column */}
                    {finalColumns
                      .find((col) => col.id == popupFilter.id)
                      ?.type?.operators.map((operator) => (
                        <option key={operator.label} value={operator.value}>
                          {operator.label}
                        </option>
                      ))}
                  </select>

                  {/* based on the chosen column's type, it's either an text input field, numeric or a calendar*/}

                  <input
                    type={
                      // get the type of the chosen column
                      finalColumns.find((col) => col.id == popupFilter.id)?.type
                        ?.id
                    }
                    // set the value of the popup filter
                    onChange={(e) => {
                      // set the value of the popup filter
                      setPopupFilter({
                        ...popupFilter,
                        value: e.target.value.toString(),
                      });
                    }}
                    // on pressing enter, add the filter to the filters array and close the menu
                    onKeyUp={(e) => {
                      if (e.key == "Enter") {
                        handleAddFilter();
                      }
                    }}
                  />

                  <button onClick={handleAddFilter}>+</button>
                  <button onClick={() => setPopupFilterVisible(false)}>
                    X
                  </button>
                </div>
              )}
            </div>

            {/* apply button */}

            {(customFilters != undefined || customSorting != undefined) && (
              <button onClick={() => getData({ pageIndex, pageSize })}>
                Apply
              </button>
            )}
          </div>
          {showOrHideColumns &&
            tableInstance.getAllLeafColumns().map((columnEl) => {
              if (columnEl.id != selectionKey)
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
          <hr />
          <table>
            <thead>
              {tableInstance.getHeaderGroups().map((headerEl) => {
                // table row
                return (
                  <tr key={headerEl.id}>
                    {headerEl.headers.map((columnEl) => {
                      if (
                        columnEl.id !== selectionKey ||
                        (columnEl.id == selectionKey && selectRows)
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

                                  {columnEl.id != selectionKey && (
                                    <PopupMenu
                                      options={[
                                        ...(columnEl.column.getCanSort() &&
                                        columnSorting
                                          ? [
                                              {
                                                label: "Sort Ascending",
                                                action: () => {
                                                  columnEl.column.toggleSorting(
                                                    0
                                                  );
                                                },
                                              },
                                              {
                                                label: "Sort Descending",
                                                action: () => {
                                                  columnEl.column.toggleSorting(
                                                    1
                                                  );
                                                },
                                              },
                                              {
                                                label: "Remove Sort",
                                                action: () => {
                                                  columnEl.column.toggleSorting(
                                                    null
                                                  );
                                                },
                                              },
                                            ]
                                          : []),

                                        {
                                          label: "Move Left",
                                          action: () => {
                                            // get the index of the column
                                            const index =
                                              tableInstance.options.state.columnOrder.findIndex(
                                                (col) => col == columnEl.id
                                              );

                                            // console.log(index);
                                            // get the current order of the columns
                                            const currentOrder = [
                                              ...tableInstance.options.state
                                                .columnOrder,
                                            ];
                                            // if the index of the column is not 1, then move the column to the left
                                            if (index !== 1) {
                                              // get the column to the left
                                              const leftColumn =
                                                currentOrder[index - 1];

                                              // swap the column with the column to the left
                                              currentOrder[index - 1] =
                                                columnEl.id;
                                              currentOrder[index] = leftColumn;

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

                                            // if the index of the column is not 0, then move the column to the left
                                            if (
                                              index !==
                                              currentOrder.length - 1
                                            ) {
                                              // get the column to the left
                                              const rightColumn =
                                                currentOrder[index + 1];

                                              // swap the column with the column to the right
                                              currentOrder[index + 1] =
                                                columnEl.id;
                                              currentOrder[index] = rightColumn;

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
                                {/* {columnEl.column.getCanFilter() ? (
                              <div>
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
                                      // search(columnEl.id, value, pageSize);
                                    }
                                  }}
                                />
                              </div>
                            ) : null} */}
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
                        cellEl.column.id !== selectionKey ||
                        (cellEl.column.id == selectionKey && selectRows)
                      ) {
                        return (
                          <td key={cellEl.id}>
                            {flexRender(
                              cellEl.column.columnDef.cell,
                              cellEl.getContext()
                            )}
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
          {selectRows && (
            <>
              <hr />
              {/* Selected Rows: {tableInstance.getSelectedRowModel().rows.length} */}
              Selected Rows: {Object.keys(selectedRows).length}
            </>
          )}
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
                tableInstance.getState().pagination.pageSize ??
                pageSizeOptions[0]
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
      )}
    </>
  );
};

export default CustomTable;
