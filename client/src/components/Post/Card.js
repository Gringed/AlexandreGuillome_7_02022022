import React, { useEffect, useState } from "react";
import * as Icons from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { updatePost, deletePost } from "../../actions/posts.actions";
import { dateParse } from "../Utils";
import Comment from "./Comment";
import LikeButton from "./LikeButton";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComment, setShowComment] = useState(false);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const postsData = useSelector((state) => state.postsReducer);
  const likesData = useSelector((state) => state.likesReducer);
  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post.id, textUpdate));
    }
    setIsUpdated(false);
  };

  const deletePostUser = () => {
    dispatch(deletePost(post.id))
  }

  useEffect(() => {
    usersData && setIsLoading(false);
  }, [usersData, likesData, postsData]);

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
                    else return null;
                  })
                  .join("")
              }
              alt="Utilisateur qui a posté du contenu"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <div>
                  {usersData &&
                    usersData
                      .map((user) => {
                        if (user.id === post.userId)
                          return user.firstName + " " + user.lastName;
                        else return null;
                      })
                      .join("")}
                </div>
              </div>
              <span>{dateParse(post.createdAt)}</span>
            </div>
            {!isUpdated && <p>{post.message}</p>}
            {isUpdated && (
              <>
                <div className="update-post">
                  <textarea
                    defaultValue={post.message}
                    onChange={(e) => setTextUpdate(e.target.value)}
                  />
                </div>
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Modifier
                  </button>
                </div>
              </>
            )}
            {post.imagePost && (
              <img src={post.imagePost} alt="" className="card-pic" />
            )}
            {post.video && (
              <iframe
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={post.id}
              ></iframe>
            )}
            {userData.id === post.userId || userData.isAdmin === true ? (
              <>
                <div className="button-container">
                  <div onClick={() => setIsUpdated(!isUpdated)}>
                    <Icons.BiEdit />
                  </div>
                  <div
                    onClick={() => {
                      if (
                        window.confirm(
                          "Voulez vous vraiment supprimer ce post ?"
                        )
                      ) {
                        deletePostUser();
                      }
                    }}
                  >
                    <Icons.BiTrash />
                  </div>
                </div>
              </>
            ) : null}
            <div className="card-footer">
              <div className="comment-icon">
                <Icons.BiCommentDetail className="ico" onClick={() => setShowComment(!showComment)}/>
                <span>{post.comments}</span>
              </div>
              <LikeButton post={post} />
            </div>
            {showComment && <Comment post={post}/>}
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
