import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ active, routes, withIcons = true }) => {
  // Function to render routes recursively
  const renderRoutes = (routes) => {
    return routes.map((route, index) => (
      <li key={index}>
        <Link to={route.path}>
          {withIcons && route?.icon}
          {active && route.name}
        </Link>
        {/* Check if the route has children and render them as nested list */}
        {route.children && route.children.length > 0 && (
          <ul>{renderRoutes(route.children)}</ul> // Recursive call for children
        )}
      </li>
    ));
  };

  return (
    <div
      className={
        active ? "sidenav active" : withIcons ? "sidenav withIcons" : "sidenav"
      }
    >
      <ul>{renderRoutes(routes)}</ul>
    </div>
  );
};

export default Navbar;
