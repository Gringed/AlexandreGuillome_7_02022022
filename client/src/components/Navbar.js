import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
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
        {uid ? (
          <ul>
            
            <li className="welcome">
              <NavLink to="/profil" className="navlink">
                <img src={`${userData.avatar}`} alt={userData.avatar} />
                <p>
                  {userData.firstName} {userData.lastName}
                </p>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li className="welcome">
              <NavLink to="/profil">
                <img src="./img/icons/login.svg" alt="login" />
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
