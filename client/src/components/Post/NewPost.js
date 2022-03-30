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
  const [file, setFile] = useState("");
  const userData = useSelector((state) => state.userReducer);
  const [errors, setErrors] = useState("");
  const dispatch = useDispatch();

  const handlePost = async () => {
    if (message || image || video) {
      const data = new FormData();
      data.append("userId", userData.id);
      data.append("message", message);
      if (file) data.append("image", file);
      data.append("video", video);

      await dispatch(addPost(data));
      dispatch(getPosts());
      cancelPost();
    } else alert("Veuillez entrez un message");
  };

  const handleImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setVideo("");
  };

  const cancelPost = () => {
    setMessage("");
    setImage("");
    setVideo("");
    setFile("");
    setErrors("");
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
          findLink.splice(i, 1);
          setMessage(findLink.join(" "));
          setImage("");
        }
      }
    };
    handleVideo();
  }, [userData, message, video]);
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
            <label htmlFor="message" className="access-only">
              Message
            </label>
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
                  <div className="card-header">
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
                    <label htmlFor="image" className="access-only">
                      File
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept=".jpg, .png, .jpeg, .gif"
                      onChange={(e) => handleImage(e)}
                    />
                  </>
                )}
                {video && (
                  <button onClick={() => setVideo("")}>Supprimer vidéo</button>
                )}
              </div>
              {file ? (
                file.type !== "image/jpeg" &&
                file.type !== "image/jpg" &&
                file.type !== "image/png" &&
                file.type !== "image/gif" ? (
                  <p>Format incorrect <b>(.png, .jpg, .jpeg acceptés)</b></p>
                ) : file.size > 600000 ? (
                  <p>
                    Le fichier dépasse <b>600Ko</b>
                  </p>
                ) : null
              ) : null}
              <div className="btn-send">
                {message || image || video.length > 20 ? (
                  <button className="cancel" onClick={cancelPost}>
                    Annuler
                  </button>
                ) : null}
                <button
                  className="send"
                  disabled={
                    !message &&
                    !video &&
                    (file.type !== "image/jpeg" &&
                    file.type !== "image/jpg" &&
                    file.type !== "image/png" &&
                    file.type !== "image/gif")
                    || file.size > 600000
                  }
                  onClick={handlePost}
                >
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
