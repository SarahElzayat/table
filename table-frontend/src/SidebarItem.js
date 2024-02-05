import React from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const SidebarItem = ({ route, index, withIcons, active }) => {
  const location = useLocation();

  const [open, setOpen] = React.useState(false);

  if (active && route?.children) {
    // return an element with an arrow that opens the nested list
    return (
      <li key={index}>
        <Link to={route.path}>
          {withIcons && route?.icon}
          {active && route.name}
          <span
            onClick={() => setOpen(!open)}
            style={{ alignSelf: "center", marginLeft: "auto", paddingRight: 5 }}
          >
            {open ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
          </span>
        </Link>
        {/* Check if the route has children and render them as nested list */}
        {open && route.children.length > 0 && (
          <ul
            style={{
              listStyleType: "none",
              marginLeft: "1.5rem",
            }}
          >
            {route.children.map((child, index) => (
              <SidebarItem
                key={index}
                route={child}
                withIcons={withIcons}
                active={active}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }
  return (
    <li
      key={index}
      className={location.pathname === route.path ? "activeSidebarItem" : ""}
    >
      <Link to={route.path}>
        {withIcons && route?.icon}
        {active && route.name}
      </Link>
      {/* Check if the route has children and render them as nested list */}
      {/* {route.children && route.children.length > 0 && (
        <ul>{SidebarItem(route.children)}</ul> // Recursive call for children
      )} */}
    </li>
  );
};

export default SidebarItem;
