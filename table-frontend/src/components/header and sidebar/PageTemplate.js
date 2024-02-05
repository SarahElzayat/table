import React from "react";
import { Outlet } from "react-router-dom"

const PageTemplate = ({ title }) => {
  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          marginTop: "10rem",
          fontSize: "3rem",
        }}
      >
        {title}
      </h1>
      <Outlet />

    </div>
  );
};

export default PageTemplate;
