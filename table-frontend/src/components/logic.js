import React from "react";

const BASE_URL = "http://127.0.0.1:8000/api/users";
export const Logic = () => {
  const [data, setData] = React.useState({});
  const [total, setTotal] = React.useState(null);
  const [customFilters, setCustomFilters] = React.useState([]);
  const [customSorting, setCustomSorting] = React.useState([]);

  const getUsers = async (props) => {
    const { pageIndex, pageSize } = props;
    console.log(customSorting);
    const response = await fetch(
      `${BASE_URL}/paginated/${pageSize}/${pageIndex + 1}`
    );
    let data = await response.json();
    setData(data);
    setTotal(data.total);
  };

  return {
    data,
    total,
    getUsers,
    customFilters,
    setCustomFilters,
    customSorting,
    setCustomSorting,
  };
};
