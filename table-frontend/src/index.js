import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import AppWithNav from "./AppWithNav";
import tempLogo from "./components/Logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdHomeFilled } from "react-icons/md";
import { MdOutlinePermDeviceInformation } from "react-icons/md";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import PageTemplate from "./components/header and sidebar/PageTemplate";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppWithNav
      logo={tempLogo}
      routes={[
        {
          name: "Home",
          path: "/",
          icon: <MdHomeFilled />,
          exact: true,
          element: <PageTemplate title="Home" />,
          children: [
            {
              name: "Home 1",
              path: "/home1",
              // element: <PageTemplate title="Home 1" />,
              children: [
                {
                  name: "Home 1.1",
                  path: "/home1.1",
                  element: <PageTemplate title="Home 1.1" />,
                },
                {
                  name: "Home 1.2",
                  path: "/home1.2",
                  element: <PageTemplate title="Home 1.2" />,
                },
              ],
            },
            {
              name: "Home 2",
              path: "/home2",
              element: <PageTemplate title="Home 2" />,
            },
          ],
        },
        {
          name: "About",
          path: "/about",
          icon: <MdOutlinePermDeviceInformation />,
          element: <PageTemplate title="About" />,
        },

        {
          name: "Services",
          path: "/services",
          icon: <MdOutlineMiscellaneousServices />,
        },
      ]}
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
