import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Feed from "../components/Post/Feed";

const Home = () => {
  
  const uid = useContext(UidContext);
  return (
    <div className="home">
      {uid ? <div></div> : <div>test</div>}
      <div className="main">
        <Feed />
      </div>
    </div>
  );
};

export default Home;
