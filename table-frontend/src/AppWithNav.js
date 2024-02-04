import React from "react";
import Navbar from "./components/Navbar";
import { GiHamburgerMenu } from "react-icons/gi";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./AppWithNav.css";
import PageTemplate from "./components/header and sidebar/PageTemplate";

const AppWithNav = ({ routes, logo }) => {
  const [showSidebar, setShowSidebar] = React.useState(true);
  return (
    <>
      <div className="appContainer">
        <Router>
          <header>
            {logo !== undefined && (
              <img src={logo} alt="logo" className="logo" />
            )}
            <GiHamburgerMenu onClick={() => setShowSidebar(!showSidebar)} />
          </header>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Navbar active={showSidebar} routes={routes} />
            {/* <div > */}
            <div className="bodyBgd">
              <Routes>
                <Route path="/" exact element={<PageTemplate title="Home" />} />
                <Route path="/about" element={<PageTemplate title="About" />} />
              </Routes>
            </div>
          </div>
        </Router>
      </div>
    </>
  );
};

export default AppWithNav;
