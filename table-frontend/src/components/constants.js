export const FILTER_TYPES = {
  TEXT: {
    id: "text",
    label: "Text",
    operators: [
      {
        label: "Equals",
        value: "equals",
      },
      {
        label: "Not Equals",
        value: "not-equals",
      },
      {
        label: "Contains",
        value: "contains",
      },
      {
        label: "Does Not Contain",
        value: "does-not-contain",
      },
      {
        label: "Starts With",
        value: "starts-with",
      },
      {
        label: "Ends With",
        value: "ends-with",
      },
    ],
  },
  NUMBER: {
    id: "number",
    label: "Number",
    operators: [
      {
        label: "Equals",
        value: "equals",
      },
      {
        label: "Not Equals",
        value: "not-equals",
      },
      {
        label: "Greater Than",
        value: "greater-than",
      },
      {
        label: "Less Than",
        value: "less-than",
      },
      {
        label: "Greater Than Or Equals",
        value: "greater-than-or-equals",
      },
      {
        label: "Less Than Or Equals",
        value: "less-than-or-equals",
      },
    ],
  },

  DATE: {
    id: "date",
    label: "Date",
    operators: [
      {
        label: "Equals",
        value: "equals",
      },
      {
        label: "Not Equals",
        value: "not-equals",
      },
      {
        label: "After",
        value: "after",
      },
      {
        label: "Before",
        value: "before",
      },
      {
        label: "After Or Equal",
        value: "after-or-equal",
      },
      {
        label: "Before Or Equal",
        value: "before-or-equal",
      },
    ],
  },
};
