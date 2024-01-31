import React from "react";

const BASE_URL = "http://127.0.0.1:8000/api/users";
export const Logic = () => {
  const [data, setData] = React.useState({});
  // const [nextPage, setNextPage] = React.useState(null);
  // const [previousPage, setPreviousPage] = React.useState(null);
  // const [firstPage, setFirstPage] = React.useState(null);
  // const [lastPage, setLastPage] = React.useState(null);
  const [total, setTotal] = React.useState(null);
  // const [currentPage, setCurrentPage] = React.useState(1);
  // const [pageSize, setPageSize] = React.useState(10); // [10, 10, 15, 20

  const getUsers = async (pageIndex = 0, pageSize = 10) => {
    const response = await fetch(
      `${BASE_URL}/paginated/${pageSize}/${pageIndex + 1}`
    );
    let data = await response.json();
    setData(data);
    setTotal(data.total);
  };

  const search = async (column, value, perPage = 10) => {
    // /users/search/{column}/{value}/{perPage?}
    let url = `${BASE_URL}/search/${column}/${value}/${perPage}`;

    const response = await fetch(url);
    let data = await response.json();
    setData(data);
    setTotal(data.total);
  };

  const sort = async (column, order, perPage = 10) => {
    let url = `${BASE_URL}/sort/${column}/${order}/${perPage}`;

    const response = await fetch(url);
    let data = await response.json();
    setData(data);
    setTotal(data.total);
  };

  return {
    data,
    total,
    search,
    sort,
    getUsers,
  };
};
