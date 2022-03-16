import React from "react";
import { useSelector } from "react-redux";
import { dateParse } from "../Utils";
import UploadImg from "./UploadImg";
import Card from "../Post/Card";
const UpdateProfil = () => {
  const postsData = useSelector((state) => state.postsReducer);
  const userData = useSelector((state) => state.userReducer);

  return (
    <div className="profil-container">
      <div className="update-container">
      <div className="info-card">
          <div className="bio-update">
          
              <h4>Espion depuis le : {dateParse(userData.createdAt)}</h4>
              <p>Mon identifiant : {userData.email}</p>
              </div>
        </div>
        <div className="background-account">
          <h1>
            {userData.firstName} {userData.lastName}
          </h1>
          <br />
          <img src={userData.avatar} alt="User Profil" />
          {/* <p>{errors.maxSize}</p>
                <p>{errors.format}</p>   */}
          <UploadImg />
          
        </div>
        
            <div className="background-posts">
              
              {postsData.length  ? (
                postsData.map((post) => {
                  if (post.userId === userData.id)
                  return <Card post={post} key={post.id} />;
                })
              ) : (
                <p>Aucun post</p>
              )}
            </div>
          
      </div>
    </div>
  );
};

export default UpdateProfil;
