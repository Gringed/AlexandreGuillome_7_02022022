import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { dateParse } from "./Utils";

const Users = () => {
  const usersData = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    
  }, [dispatch]);

  return (
    <div className="trending-container">
      <h1>Utilisateurs récents</h1>
      <NavLink to="/users">
        <ul>
          {usersData.sort((a, b) => {
            return b.id-a.id
            }) &&
            usersData.map((userInfo) => {
              return (
                <li key={userInfo.id}>
                  <div>
                    {userInfo.avatar && (
                      <img src={userInfo.avatar} alt="" />
                    )}
                  
                  </div>
                  <div className="trend-content">
                      <p>{userInfo.firstName} {userInfo.lastName}</p>
                      <span>Inscrit le : {dateParse(userInfo.createdAt)}</span>
                  </div>
                </li>
              );
            })}
        </ul>
      </NavLink>
    </div>
  );
};

export default Users;
