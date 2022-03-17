import React from "react";
import { useSelector } from "react-redux";
import { dateParse } from "../components/Utils";
import * as Icons from 'react-icons/bi'

const Users = () => {
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);

  const handleSupprUser = () => {

  }
  return (
    <div className="all-users">
      <div className="users-container">
        <h1>Vous faites partie des meilleurs espions</h1>
        {usersData.map((usersInfo) => {
          return (
            <div key={usersInfo.id} className="user-container">
              <ul>
                <li>
                  <div className="users-content">
                    <img src={usersInfo.avatar} alt="post pic" />
                    <p>
                      {usersInfo.firstName} {usersInfo.lastName}
                    </p>
                    <p>{usersInfo.isAdmin === true ? "Espion Admin" : "Espion standard"}</p>
                    <span>Inscrit le : {dateParse(usersInfo.createdAt)}</span>
                    {userData.isAdmin === true ? (<button onClick={() => {
              if (
                window.confirm(
                  "Voulez vous vraiment supprimer ce compte ? Cette action est irréversible"
                )
              ) {
                  handleSupprUser()
              }
            }}><Icons.BiUserX /></button>) : null }
                  </div>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
