import React from "react";
import "./App.css";
import FinalTable from "./components/FinalTable";
import { columnDefWithCheckBox } from "./components/columns";
import { Logic } from "./components/logic";
function App() {
  const { data, total, search, sort, getUsers } = Logic();

  const [selectedRows, setSelectedRows] = React.useState({}); // rows indices
  // const [filtering, setFiltering] = React.useState("");
  // const [sorting, setSorting] = React.useState();
  return (
    <div className="App">
      <FinalTable
        data={data.data ?? []}
        columns={columnDefWithCheckBox}
        selectRows={true}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        // filtering={filtering}
        // setFiltering={setFiltering}
        // sorting={sorting}
        // setSorting={setSorting}
        pageSizeOptions={[10, 100, 15, 20, 200]}
        total={total}
        // nextPage={data.next_page_url}
        // previousPage={previousPage}
        // firstPage={firstPage}
        // lastPage={lastPage}
        // getPage={getPage}
        // currentPage={currentPage}
        search={search}
        sort={sort}
        getData={getUsers}
        // pageSize={pageSize}
      />
    </div>
  );
}

export default App;
