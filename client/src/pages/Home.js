import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Log from "../components/Log";
import Feed from "../components/Post/Feed";
import NewPost from "../components/Post/NewPost";
import UsersTrend from "../components/Users";

const Home = () => {
  const uid = useContext(UidContext);

  return (
        <div className="home">
          {uid ? (
          <>
            <div></div>
            <div className="main">
              <div className="home-header">
                <NewPost />
              </div>
              <Feed />
            </div>
            <div className="right-side">
              <div className="right-side-container">
                <div className="wrapper">
                  <UsersTrend />
                </div>
              </div>
            </div>
          </>
        
      ) : (
        <Log />
      )}
    </div>
  );
};

export default Home;
