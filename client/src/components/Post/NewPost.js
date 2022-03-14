import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as Icons from "react-icons/bi";
import { timestampParser } from "../Utils";
import { addPost, getPosts } from "../../actions/posts.actions";

const NewPost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [file, setFile] = useState(null);
  const userData = useSelector((state) => state.userReducer);
  const errors = useSelector((state) => state.errorsReducer.postErrors);
  const dispatch = useDispatch();

  const handlePost = async () => {
      if(message || image){
        const data = new FormData();
        data.append('userId', userData.id)
        data.append('message', message)
        if(file) data.append('image', file)

       await dispatch(addPost(data))
        dispatch(getPosts());
        cancelPost();
        
      }
      else alert("Veuillez entrez un message")
  };

  const handleImage = (e) => {
      setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0])
    setVideo('')
  };

  const cancelPost = () => {
    setMessage("");
    setImage("");
    setVideo("");
    setFile(null);
  };

  useEffect(() => {
    if (userData) {
      setIsLoading(false);
    }
    const handleVideo = () => {
        let findLink = message.split(" ");
        for (let i = 0; i < findLink.length; i++) {
          if (
            findLink[i].includes("https://www.yout") ||
            findLink[i].includes("https://yout")
          ) {
            let embed = findLink[i].replace("watch?v=", "embed/");
            setVideo(embed.split("&")[0]);
            findLink.splice(i, 1)
            setMessage(findLink.join(" "))
            setImage('')
          }
        }
      };
    handleVideo();
  }, [userData, message, video, file]);
  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <div className="data">
            <p>
              <span>
                {userData.isAdmin === false
                  ? "Espion standard"
                  : "Espion admin"}
              </span>
            </p>
          </div>

          <div className="user-info">
            <NavLink to="profil">
              <img src={userData.avatar} alt="avatar utilisateur" />
            </NavLink>
          </div>

          <div className="post-form">
            <textarea
              name="message"
              id="message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              placeholder={`Quoi de neuf ${userData.firstName} ?`}
            />
            {message || image || video.length > 20 ? (
              <li className="card-container">
                <div className="card-left">
                  <img src={userData.avatar} alt="avatar utilisateur" />
                </div>
                <div className="card-right">
                  <div className="cart-header">
                    <div className="pseudo">
                      <h3>
                        {userData.firstName} {userData.lastName}
                      </h3>
                    </div>
                    <span>{timestampParser(Date.now())}</span>
                  </div>
                  <div className="content">
                    <p>{message}</p>
                    {image && <img src={image} alt="post d'un utilisateur" />}
                    {video && (
                      <iframe
                        src={video}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video}
                      ></iframe>
                    )}
                  </div>
                </div>
              </li>
            ) : null}
            <div className="footer-form">
              <div className="icon">
                {!video && (
                  <>
                    <Icons.BiImages />
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".jpg, .png, .jpeg, .gif"
                      onChange={(e) => handleImage(e)}
                    />
                  </>
                )}
                {video && (
                  <button onClick={() => setVideo("")}>Supprimer vidéo</button>
                )}
              </div>
              {errors.format && <p>{errors.format}</p>}
              {errors.maxSize && <p>{errors.maxSize}</p>}
              <div className="btn-send">
                {message || image || video.length > 20 ? (
                  <button className="cancer" onClick={cancelPost}>
                    Annuler
                  </button>
                ) : null}
                <button className="send" onClick={handlePost}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPost;
