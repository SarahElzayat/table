import React from "react";
import Navbar from "./components/Navbar";
import { GiHamburgerMenu } from "react-icons/gi";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./AppWithNav.css";
import PageTemplate from "./components/header and sidebar/PageTemplate";

const AppWithNav = ({ routes, logo }) => {
  const [showSidebar, setShowSidebar] = React.useState(true);

  // Function to recursively render routes and their children
  const renderRoutes = (routes) => {
    return routes.map((route, index) => {
      if (route.children) {
        // Render parent route and recursively render children routes inside the parent's element
        return (
          <Route key={index} path={route.path} element={route.element}>
            {renderRoutes(route.children)} {/* Recursive call for children */}
          </Route>
        );
      } else {
        // Render route without children
        return <Route key={index} path={route.path} element={route.element} />;
      }
    });
  };
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
            <div className="bodyBgd">
              <Routes>
                {renderRoutes(routes)} {/* Use the renderRoutes function */}
              </Routes>
            </div>
          </div>
        </Router>
      </div>
    </>
  );
};

export default AppWithNav;
