import React from "react";
import SidebarItem from "../SidebarItem";

const Sidebar = ({ active, routes, withIcons = true }) => {
  return (
    <div
      className={
        active ? "sidebar active" : withIcons ? "sidebar withIcons" : "sidebar"
      }
    >
      <ul>
        {routes.map((route, index) => (
          <SidebarItem
            key={index}
            route={route}
            withIcons={withIcons}
            active={active}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
