import React, { useEffect, useState } from "react";
import Routes from "./components/Routes";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";
import Log from "./components/Log";

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}tokenId`,
        withCredentials: true,
      })
        .then((res) => setUid(res.data))
        .catch((err) => console.log("No Token"));
    };
    fetchToken();

    if (uid) {
      dispatch(getUser(uid));
    }
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      {uid ? (
        <Routes />
      ) : loading ? (
        <div className="loader"></div>
      ) : (
        <div className="home">
          <div className="profil-page">
            <div className="log-container">
              <Log signin={false} signup={true} />
              <div className="img-container">
                <img src="./img/log.svg" alt="Connexion / inscription" />
              </div>
            </div>
          </div>
        </div>
      )}
    </UidContext.Provider>
  );
};

export default App;
