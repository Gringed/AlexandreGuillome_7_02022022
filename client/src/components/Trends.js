import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTrends } from "../actions/posts.actions";

const Trends = () => {
  const posts = useSelector((state) => state.allPostsReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const trendList = useSelector((state) => state.trendingReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (posts[0]) {
      const postsArray = Object.keys(posts).map((i) => posts[i]);
      let sortArray = postsArray.sort((a, b) => {
        return b.likes - a.likes;
      });
      sortArray.length = 10;
      dispatch(getTrends(sortArray));
    }
  }, [posts, dispatch]);

  return (
    <div className="trending-container">
      <h4>Populaires</h4>
      <NavLink to="/trending">
        <ul>
          {trendList.length &&
            trendList.map((post) => {
              return (
                <li key={post.id}>
                  <div>
                    {post.imagePost && (
                      <img src={post.imagePost} alt="post pic" />
                    )}
                    {post.imagePost === null && (
                      <img
                        src={
                          usersData[0] &&
                          usersData.map((user) => {
                            if (user.id === post.userId) {
                              return user.avatar
                            }else return null
                          }).join("")
                        }
                        alt="profil utilisateur"
                      />
                    )}
                  </div>
                  <div className="trend-content">
                      <p>{!post.message ? <i>Ce post ne contient pas de texte</i> : post.message}</p>
                      <span>Lire</span>
                  </div>
                </li>
              );
            })}
        </ul>
      </NavLink>
    </div>
  );
};

export default Trends;
