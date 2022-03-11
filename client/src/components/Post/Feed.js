import React, { useEffect, useState } from "react";
import * as Icons from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/posts.actions";
import Card from "./Card";
const Feed = () => {
  const [loadPost, setLoadPost] = useState(true);
  const dispatch = useDispatch();
  const postsData = useSelector((state) => state.postsReducer);

  useEffect(() => {
      if(loadPost){
          dispatch(getPosts());
          setLoadPost(false);
      }
  }, [loadPost, dispatch])

  return (
    <><div className="thread-container">
      {postsData.length ? (
        postsData.map((post) => {
          return (
            <Card post={post} key={post.id}/>
          );
        })
      ) : (
        <p>Aucun post</p>
      )}
      </div>
    </>
  );
};

export default Feed;
