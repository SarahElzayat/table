import React from "react";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

export const CustomTableLogic = ({
  data,
  columns,
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
}) => {
  const finalData = React.useMemo(() => data, [data]);
  const finalColumns = React.useMemo(() => columns, []);
  const [popupFilterVisible, setPopupFilterVisible] = React.useState(false);
  const [popupFilter, setPopupFilter] = React.useState(
    // get the first column that has a type
    {
      id: null,
      operator: null,
      // get the first operator of the first column that has a type
      value: null,
    }
  );
  const [sortingVisible, setSortingVisible] = React.useState(false);
  const [sortingColumn, setSortingColumn] = React.useState({
    id: null,
    order: null,
  });

  const [columnOrder, setColumnOrder] = React.useState(
    finalColumns.map((col) => col.id)
  );
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [sorting, setSorting] = React.useState();
  // const defaultColumn = React.useMemo(() => {
  //   return {
  //     enableColumnFilter: true,
  //   };
  // }, []);

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
    // defaultColumn: defaultColumn,
    pageCount: Math.ceil(total / pageSize),
    manualPagination: true,
    manualSorting: !columnSorting,
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
    onRowSelectionChange: setSelectedRows,
    enableRowSelection: true,
    onColumnOrderChange: setColumnOrder,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
  });
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
