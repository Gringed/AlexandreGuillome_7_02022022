import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getComments } from "../../actions/comments.actions";
import { deleteComment, editComment, getPosts } from "../../actions/posts.actions";
import { UidContext } from "../AppContext";
import * as Icons from "react-icons/bi";

const EditDeleteCom = ({ comment }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState("");
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();

    if (message) {
      dispatch(editComment(comment.idPost, comment.id, message))
        .then(() => dispatch(getComments()))
        .then(() => dispatch(getPosts()))

        
      setMessage("");
      setEdit(false);
    }
  };

  const handleDelete = () => {
      dispatch(deleteComment(comment.id, comment.idPost))
      .then(() => dispatch(getComments()))
      .then(() => dispatch(getPosts()))
      
  };

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.userId) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, comment.userId, dispatch]);

  return (
    <div className="edit-comment">
      {isAuthor && edit === false && (
        <>
          <span onClick={() => setEdit(!edit)}>
            <Icons.BiEditAlt />
          </span>
          <span
            onClick={() => {
              if (
                window.confirm(
                  "Voulez vous vraiment supprimer votre commentaire ?"
                )
              ) {
                handleDelete();
              }
            }}
          >
            <Icons.BiTrashAlt />
          </span>
        </>
      )}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Editer
          </label>
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setMessage(e.target.value)}
            defaultValue={comment.message}
          />
          <br />
          <div className="btn">
            <input type="submit" value="Valider modification" />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditDeleteCom;
