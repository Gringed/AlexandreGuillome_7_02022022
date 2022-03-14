import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../actions/comments.actions";
import { addComment, getPosts } from "../../actions/posts.actions";
import { dateParse } from "../Utils";
import EditDeleteCom from "./EditDeleteCom";

const Comment = ({ post, comment }) => {
  const [text, setText] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const commentsData = useSelector((state) => state.commentsReducer);
  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(
        addComment(
          post.id,
          userData.id,
          text,
          userData.firstName,
          userData.lastName
        )
      )
        .then(() => dispatch(getComments()))
        .then(() => dispatch(getPosts()))
        .then(() => setText(""));
    }
  };
  
  useEffect(() => {
   
  }, []);
  return (
    <div className="comments-container">
      {commentsData ? (
        commentsData.map((comment) => {
          if (comment.idPost === post.id) {
            return (
              <div
                className={
                  comment.userId === userData.id
                    ? "comment-container client"
                    : "comment-container"
                }
                key={comment.id}
              >
                <div className="left-part">
                  <img
                    src={
                      usersData &&
                      usersData
                        .map((user) => {
                          if (user.id === comment.userId) return user.avatar;
                          else return null;
                        })
                        .join("")
                    }
                    alt="img de l'utilisateur qui a commenté"
                  />
                </div>
                <div className="right-part">
                  <div className="comment-header">
                    <div className="pseudo">
                      <h3>
                        {comment.firstname} {comment.lastname}
                      </h3>
                    </div>
                    <span>{dateParse(comment.createdAt)}</span>
                  </div>
                  <p>{comment.message}</p>
                  <div className="edit-comment">
                    <EditDeleteCom comment={comment}/>
                  </div>
                </div>
              </div>
            );
          }
        })
      ) : (
        <p>Aucun commentaire</p>
      )}
      {userData.id && (
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Laisser un commentaire"
          />
          <br />
          <input type="submit" value="Envoyer" />
        </form>
      )}
    </div>
  );
};

export default Comment;
