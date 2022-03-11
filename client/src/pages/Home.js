import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";

const Home = () => {
  const uid = useContext(UidContext);
  return (
    <div className="home">
      {uid ? (
        <div>
          <h1>Je suis connecté</h1>
        </div>
      ) : (
        <div>test</div>
      )}
    </div>
  );
};

export default Home;
