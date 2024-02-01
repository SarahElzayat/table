import React from "react";
import "./App.css";
import CustomTable from "./components/CustomTable";
import { columnDefWithCheckBox } from "./components/columns";
import { Logic } from "./components/logic";
function App() {
  const {
    data,
    total,
    customFilters,
    setCustomFilters,
    customSorting,
    setCustomSorting,
    getUsers,
  } = Logic();

  const [selectedRows, setSelectedRows] = React.useState({}); // rows indices

  return (
    <div className="App">
      {JSON.stringify(customFilters)}
      <br />
      {JSON.stringify(customSorting)}
      <CustomTable
        data={data.data ?? []}
        columns={columnDefWithCheckBox}
        selectRows={true}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        customFilters={customFilters}
        setCustomFilters={setCustomFilters}
        // customSorting={customSorting}
        // setCustomSorting={setCustomSorting}
        pageSizeOptions={[10, 100, 15, 20, 200]}
        total={total}
        columnSorting={true}
        getData={getUsers}
        showOrHideColumns={false}
        loading
      />
    </div>
  );
}

export default App;
