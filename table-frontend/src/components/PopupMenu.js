import React, { useState, useRef, useEffect } from "react";

const PopupMenu = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div ref={menuRef} style={{ position: "relative" }}>
      <button onClick={() => setIsOpen(!isOpen)}>⋮</button>
      {isOpen && (
        <ul
          style={{
            backgroundColor: "rgba(150,150,150 ,0.9)",
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            textAlign: "left",
            position: "absolute",
            // left: 0,
            // // top: "100%",
            paddingLeft: 0,
            // paddingRight:0,
            marginTop: 0,
            boxSizing: "border-box",
            // width: "100%", // Ensures that ul takes full width
          }}
        >
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => {
                setIsOpen(false);
                option.action();
              }}
              style={{
                display: "flex",
                boxSizing: "border-box",
                marginBottom: 2,
                width: "100%", // Ensures that li takes full width
                padding: "0.5rem", // Add padding for better appearance
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      <style>
        {`
          li:hover {
            background-color: rgba(76,175,80,0.8);
          }
        `}
      </style>
    </div>
  );
};

export default PopupMenu;
