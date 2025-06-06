import React from "react";
import { NavLink } from "react-router-dom";
import TopBar from "../Ui/TopBar";

const Header = () => {
  return (
    <div>
      <TopBar />
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
