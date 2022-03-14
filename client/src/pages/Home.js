import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Log from "../components/Log";
import Feed from "../components/Post/Feed";
import NewPost from "../components/Post/NewPost";

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
          </>
        
      ) : (
        <Log />
      )}
    </div>
  );
};

export default Home;
