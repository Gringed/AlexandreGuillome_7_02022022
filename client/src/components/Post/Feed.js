import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/posts.actions";
import { getLikes } from "../../actions/likes.actions";
import Card from "./Card";
const Feed = () => {
  const [loadPost, setLoadPost] = useState(true);
  const [count, setCount] = useState(5)
  const dispatch = useDispatch();
  const postsData = useSelector((state) => state.postsReducer);
  
  const loadMore = () => {
    if(window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight){
      setLoadPost(true)
    }
  }

  useEffect(() => {
      if(loadPost){
          dispatch(getPosts(count));
          dispatch(getLikes())
          setLoadPost(false);
          setCount(count + 5);
      }
      window.addEventListener('scroll', loadMore);
      return () => window.removeEventListener('sroll', loadMore);
  }, [loadPost, dispatch, count])

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
