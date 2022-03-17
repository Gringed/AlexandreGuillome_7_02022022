import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParse } from "../Utils";
import UploadImg from "./UploadImg";
import Card from "../Post/Card";
import cookie from "js-cookie";
import { deleteUser } from "../../actions/user.actions";

const UpdateProfil = () => {
  const postsData = useSelector((state) => state.postsReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  }
  const handleSupprAccount = () => {
      
        dispatch(deleteUser(userData.id))
        .then(() => removeCookie("jwt"))
        .catch((err) => console.log(err));
  
       window.location = "/"
  }
  return (
    <div className="profil-container">
      <div className="update-container">
      <div className="info-card">
          <div className="bio-update">
          
              <h4>Espion depuis le : {dateParse(userData.createdAt)}</h4>
              <p>Mon identifiant : {userData.email}</p>
              <button onClick={() => {
              if (
                window.confirm(
                  "Voulez vous vraiment supprimer votre compte ? Cette action est irréversible"
                )
              ) {
                handleSupprAccount();
              }
            }}>Supprimer mon compte</button>
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
                  else 
                  return null
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
