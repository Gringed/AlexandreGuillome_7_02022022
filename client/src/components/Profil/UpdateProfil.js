import React, { useState } from "react";
import { useSelector } from "react-redux";
import { dateParse } from "../Utils";
import UploadImg from "./UploadImg";

const UpdateProfil = () => {
  const posts = useSelector((state) => state.postsReducer);
  const userData = useSelector((state) => state.userReducer);

  return (
    <div className="profil-container">
      <h1>
        {userData.firstName} {userData.lastName}
      </h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.avatar} alt="User Profil" />
          {/* <p>{errors.maxSize}</p>
                <p>{errors.format}</p>   */}
          <UploadImg />
        </div>
        <div className="right-part">
          <div className="bio-update">
            <div className="background-posts">
                <p>Mon email : {userData.email}</p>
                <h4>Espion depuis le : {dateParse(userData.createdAt)}</h4>
              {/* <Posts /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
