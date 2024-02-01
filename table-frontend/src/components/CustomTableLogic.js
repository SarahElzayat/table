import React from "react";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

export const CustomTableLogic = ({
  data, // Array of objects representing table data
  columns, // Array of objects defining table columns
  selectRows, // Boolean indicating if row selection is enabled
  selectedRows, // Object tracking the selected rows in the table
  setSelectedRows, // Function to update the selectedRows state
  total, // Total number of records, for pagination purposes
  customFilters, // Array of custom filters applied to the table
  setCustomFilters, // Function to update customFilters state
  customSorting, // Array of custom sorting rules applied to the table
  setCustomSorting, // Function to update customSorting state
  getData, // Function to fetch table data
  columnSorting, // Boolean indicating if column sorting is enabled
  pageSizeOptions, // Array of numbers representing page size options
}) => {
  // Memoize data and columns to prevent unnecessary re-renders
  const finalData = React.useMemo(() => data, [data]);
  const finalColumns = React.useMemo(() => columns, []);

  // State for managing the visibility of the popup filter UI
  const [popupFilterVisible, setPopupFilterVisible] = React.useState(false);

  // State for managing the current popup filter's configuration
  const [popupFilter, setPopupFilter] = React.useState({
    id: null,
    operator: null,
    value: null,
  });

  // State for managing the visibility of the sorting UI
  const [sortingVisible, setSortingVisible] = React.useState(false);

  // State for managing the current sorting column's configuration
  const [sortingColumn, setSortingColumn] = React.useState({
    id: null,
    order: null,
  });

  // State for tracking the order of columns
  const [columnOrder, setColumnOrder] = React.useState(
    finalColumns.map((col) => col.id)
  );

  // State for managing column visibility
  const [columnVisibility, setColumnVisibility] = React.useState({});

  // State for managing sorting configurations
  const [sorting, setSorting] = React.useState();
  // const defaultColumn = React.useMemo(() => {
  //   return {
  //     enableColumnFilter: true,
  //   };
  // }, []);

  // State for managing pagination
  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: pageSizeOptions[0],
  });

  // Memoize pagination configuration
  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  // Initialize the table instance with react-table hooks
  const tableInstance = useReactTable({
    columns: finalColumns,
    data: finalData,
    // defaultColumn: defaultColumn,
    pageCount: Math.ceil(total / pageSize), // Calculate page count
    manualPagination: true, // Enable manual pagination
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: (row) => row.id,
    state: {
      rowSelection: selectedRows,
      columnOrder: columnOrder,
      columnVisibility: columnVisibility,
      sorting: sorting,
      pagination: pagination,
    },
    onRowSelectionChange: setSelectedRows, // Handler for row selection changes
    enableRowSelection: selectRows, // Enable row selection feature
    onColumnOrderChange: setColumnOrder, // Handler for column order changes
    onColumnVisibilityChange: setColumnVisibility, // Handler for column visibility changes
    onPaginationChange: setPagination, // Handler for pagination changes
    onSortingChange: setSorting, // Handler for sorting changes
  });

  // Function to handle adding a new sorting configuration
  const handleAddSorting = () => {
    // add the filter to the filters array
    if (sortingColumn.id != null && sortingColumn.order != null) {
      setCustomSorting([...customSorting, sortingColumn]);
      setSortingVisible(false);
      // clear popup filter
      setSortingColumn({
        id: null,
        order: null,
      });
    }
  };

  // Function to close the sorting UI and clear the current sorting configuration
  const handleCloseSorting = () => {
    setSortingVisible(false);
    // clear the sorting column
    setSortingColumn({
      id: null,
      order: null,
    });
  };

  const handleRemoveSorting = (id) => {
    // remove the filter from the filters array
    setCustomSorting(customSorting.filter((sort) => sort.id != id));
  };

  const handleAddFilter = () => {
    // add the filter to the filters array
    if (
      popupFilter.id != null &&
      popupFilter.operator != null &&
      // check if the value is not spaces or null
      popupFilter.value != null &&
      popupFilter.value.trim() != ""
    ) {
      setCustomFilters([...customFilters, popupFilter]);
      setPopupFilterVisible(false);
      // clear popup filter
      setPopupFilter({
        id: null,
        operator: null,
        value: null,
      });
    }
  };

  const handleRemoveFilter = (id) => {
    // remove the filter from the filters array
    setCustomFilters(customFilters.filter((filter) => filter.id != id));
  };

  // get page with page index and page size when the page index or page size changes
  React.useEffect(() => {
    getData({ pageIndex, pageSize });
  }, [pageIndex, pageSize]);

  return {
    finalData,
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
    columnOrder,
    setColumnOrder,
    columnVisibility,
    setColumnVisibility,
    sorting,
    setSorting,
    handleAddSorting,
    handleCloseSorting,
    handleRemoveSorting,
    handleAddFilter,
    handleRemoveFilter,
  };
};
