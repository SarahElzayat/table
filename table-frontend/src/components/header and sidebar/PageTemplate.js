import React from "react";

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
    </div>
  );
};

export default PageTemplate;
