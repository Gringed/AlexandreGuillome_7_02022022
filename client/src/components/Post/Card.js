import React, { useEffect, useState } from "react";
import * as Icons from 'react-icons/bi'
import { useSelector } from "react-redux";
import { dateParse } from "../Utils";
import LikeButton from "./LikeButton";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    usersData && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={post.id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                usersData &&
                usersData
                  .map((user) => {
                    if (user.id === post.userId) return user.avatar;
                  })
                  .join("")
              }
              alt="img de l'utilisateur qui a posté"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {usersData &&
                    usersData
                      .map((user) => {
                        if (user.id === post.userId)
                          return user.firstName + " " + user.lastName;
                      })
                      .join("")}
                </h3>
              </div>
              <span>{dateParse(post.createdAt)}</span>
            </div>
            <p>{post.message}</p>
            {post.imagePost && <img src={post.imagePost} alt="" className="card-pic" /> }
            <div className="card-footer">
                <div className="comment-icon">
                    <Icons.BiCommentDetail />
                    <span>{post.comments}</span>
                </div>
                <LikeButton likes={post}/>
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
