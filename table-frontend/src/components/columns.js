import { createColumnHelper } from "@tanstack/react-table";
import moment from "moment";
import IndeterminateCheckbox from "./Chechbox";

const columnHelper = createColumnHelper();

export const columnDef = [
  columnHelper.accessor("id", {
    header: "ID",
    footer: "ID",
  }),
  // {
  //   // when looking at the data, what's the key from object
  //   accessorKey: "id",

  //   // what's the header name displayed
  //   header: "ID",
  // },
  // {
  //   // when looking at the data, what's the key from object
  //   accessorFn: (row) => `${row.first_name} ${row.last_name}`,

  //   // what's the header name displayed
  //   header: "first name",
  // },
  // {
  //   // when looking at the data, what's the key from object
  //   accessorKey: "last_name",

  //   // what's the header name displayed
  //   header: "last name",
  // },
  {
    header: "Name",
    columns: [
      {
        // when looking at the data, what's the key from object
        accessorKey: "first_name",

        // what's the header name displayed
        header: "first name",
      },
      {
        // when looking at the data, what's the key from object
        accessorKey: "last_name",

        // what's the header name displayed
        header: "last name",
      },
    ],
  },
  {
    // when looking at the data, what's the key from object
    accessorKey: "email",

    // what's the header name displayed
    header: "email",
  },
  // {
  //   // when looking at the data, what's the key from object
  //   accessorKey: "gender",

  //   // what's the header name displayed
  //   header: "Header gender",
  // },
  // {
  //   // when looking at the data, what's the key from object
  //   accessorKey: "ip_address",

  //   // what's the header name displayed
  //   header: "Header ip_address",
  // },

  {
    // when looking at the data, what's the key from object
    accessorKey: "phone_number",

    // what's the header name displayed
    header: "phone_number",
  },
  {
    // when looking at the data, what's the key from object
    accessorKey: "date",

    // what's the header name displayed
    header: "date",
  },
];
export const columnDefWithCheckBox = [
  {
    id: "select",
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <>
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
        {/* {console.log(row)} */}
      </>
    ),
  },
  { id: "id", accessorKey: "id", header: "Id" },
  {
    id: "first_name",
    accessorFn: (row) => `${row.first_name}`,
    // id: "first_name",
    header: "First Name",
  },
  {
    id: "last_name",
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    id: "email",
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "phone_number",
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => moment(new Date(getValue())).format("MMM Do YY"),
  },
];
export const columnDefSorting = [
  columnHelper.accessor("id", {
    header: "ID",
    footer: "ID",
  }),

  {
    header: "Name",
    columns: [
      {
        // when looking at the data, what's the key from object
        accessorKey: "first_name",

        // what's the header name displayed
        header: "first name",
      },
      {
        // when looking at the data, what's the key from object
        accessorKey: "last_name",

        // what's the header name displayed
        header: "last name",
      },
    ],
  },
  {
    // when looking at the data, what's the key from object
    accessorKey: "email",

    // what's the header name displayed
    header: "email",
  },

  {
    // when looking at the data, what's the key from object
    accessorKey: "phone_number",

    // what's the header name displayed
    header: "phone_number",
  },
  {
    // when looking at the data, what's the key from object
    accessorKey: "date",

    // what's the header name displayed
    header: "date",
    cell: ({ getValue }) => moment(new Date(getValue())).format("DD/MM/YYYY"),
  },
];
export const columnDefWithFilters = [
  columnHelper.accessor("id", {
    header: "ID",
    footer: "ID",
  }),

  {
    header: "Name",
    columns: [
      {
        // when looking at the data, what's the key from object
        accessorKey: "first_name",

        // what's the header name displayed
        header: "first name",
        enableColumnFilter: true,
      },
      {
        // when looking at the data, what's the key from object
        accessorKey: "last_name",

        // what's the header name displayed
        header: "last name",
      },
    ],
  },
  {
    // when looking at the data, what's the key from object
    accessorKey: "email",

    // what's the header name displayed
    header: "email",
    enableColumnFilter: true,
    enableGlobalFilter: false,
  },

  {
    // when looking at the data, what's the key from object
    accessorKey: "phone_number",

    // what's the header name displayed
    header: "phone_number",
  },
  {
    // when looking at the data, what's the key from object
    accessorKey: "date",

    // what's the header name displayed
    header: "date",
    cell: ({ getValue }) => moment(new Date(getValue())).format("DD/MM/YYYY"),
  },
];
