import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Log from "../components/Log";
import Feed from "../components/Post/Feed";
import NewPost from "../components/Post/NewPost";
import Trends from "../components/Trends";

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
                  <Trends />
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
