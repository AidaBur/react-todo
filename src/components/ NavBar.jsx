import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaList } from "react-icons/fa";

import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navLinks}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.activeLink : undefined
            }
          >
            <FaHome size={24} className={styles.icon} />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/todos"
            className={({ isActive }) =>
              isActive ? styles.activeLink : undefined
            }
          >
            <FaList size={24} className={styles.icon} />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
