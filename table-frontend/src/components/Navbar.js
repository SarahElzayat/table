import React from "react";
import { Link } from "react-router-dom";
const Navbar = ({ active, routes, withIcons = true }) => {
  return (
    <div
      className={
        active ? "sidenav active" : withIcons ? "sidenav withIcons" : "sidenav"
      }
    >
      <ul>
        {routes.map((route, index) => (
          <li key={index}>
            <Link to={route.path}>
              {withIcons && route?.icon}
              {active && route.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
