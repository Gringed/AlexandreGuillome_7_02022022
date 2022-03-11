import React from "react";
import * as Icons from "react-icons/bi";
import { NavLink } from "react-router-dom";

const AsideNav = () => {
  return (
    <div className="left-nav-container">
      <div className="icons">
        <NavLink to="/trending" className={({ isActive }) =>  "" + (isActive ? "active-left-nav" : "")} >
          <Icons.BiRocket className="ico"/>
        </NavLink>
        <br />
        <NavLink to="/" className={({ isActive }) =>  "" + (isActive ? "active-left-nav" : "")}>
        <Icons.BiHome className="ico fav"/>
        </NavLink>
        <br />
        <NavLink to="/profil" className={({ isActive }) =>  "" + (isActive ? "active-left-nav" : "")}>
        <Icons.BiUser className="ico"/>
        </NavLink>
      </div>
    </div>
  );
};

export default AsideNav;
