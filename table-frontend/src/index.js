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
        },
        {
          name: "About",
          path: "/about",
          icon: <MdOutlinePermDeviceInformation />,
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
