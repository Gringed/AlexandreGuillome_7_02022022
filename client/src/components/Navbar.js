import React, { useContext } from "react";
import * as Icons from "react-icons/bi";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {HashLink} from 'react-router-hash-link'
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";

const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink to="/">
            <div className="logo">
              <img src="./img/icon.png" alt="home" />
              <h1>Groupomania</h1>
            </div>
          </NavLink>
        </div>
        <div className="left-nav-container">
          <div className="icons">
            <NavLink
              to="/users"
              className={({ isActive }) =>
                "" + (isActive ? "active-left-nav" : "")
              }
            >
              <Icons.BiListUl className="ico" />
            </NavLink>
            <br />
            <NavLink
              to="/"
              className={({ isActive }) =>
                "" + (isActive ? "active-left-nav" : "")
              }
            >
              <Icons.BiHome className="ico fav" />
            </NavLink>
            <br />
            <NavLink
              to="/profil#"
              className={({ isActive }) =>
                "" + (isActive ? "active-left-nav" : "")
              }
            >
              <Icons.BiUser className="ico" />
            </NavLink>
          </div>
        </div>
        {uid && (
          <ul>
            <li className="welcome">
              <HashLink to="/profil#" className="navlink">
                <img src={`${userData.avatar}`} alt={userData.avatar} />
                <p>
                  {userData.firstName} {userData.lastName}
                </p>
              </HashLink>
            </li>
            <Logout />
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
