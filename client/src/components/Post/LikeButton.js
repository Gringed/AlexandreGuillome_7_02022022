import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, likePost, unLikePost } from "../../actions/posts.actions";
import { getLikes } from "../../actions/likes.actions";
const LikeButton = ({ post }) => {
  const likesData = useSelector((state) => state.likesReducer);
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(likePost(post.id, uid))
    .then(() => dispatch(getPosts()))
    setLiked(true);
  };
  const handleUnlike = () => {
    dispatch(unLikePost(post.id, uid))
    .then(() => dispatch(getPosts()))
    setLiked(false);
  };
  const filterId = likesData.find(
    (like) => like.idUserLike === uid && like.idPost === post.id
  );
  useEffect(() => {
    if (filterId) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [uid, filterId, dispatch]);
  // POUR LES LIKES :
  // Faire une colonne en plus dans la table likes et gérer ça avec le back pour que tout soit dans la table like
  return (
    <div className="like-container">
      {!uid && (
        <Popup
          trigger={<img src="./img/icons/heart.svg" alt="" />}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div>Connectez-vous pour aimer un post</div>
        </Popup>
      )}
      {uid && liked === false && (
        <img src="./img/icons/heart.svg" onClick={handleLike} alt="" />
      )}
      {uid && liked && (
        <img src="./img/icons/heart-filled.svg" onClick={handleUnlike} alt="" />
      )}
      <span>{post.likes}</span>
    </div>
  );
};

export default LikeButton;
