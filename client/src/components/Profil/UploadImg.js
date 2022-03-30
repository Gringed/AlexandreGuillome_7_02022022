import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadAvatar } from "../../actions/user.actions";
import * as Icons from 'react-icons/bi'
const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer)

  const handlePicture = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("name", userData.firstName);
    data.append("userId", userData.id)
    data.append("image", file);

    dispatch(uploadAvatar(data, userData.id))
  };
  
  return (
    
    <form onSubmit={handlePicture} className="upload-pic">
      <label htmlFor="file" className="btn"><Icons.BiEdit /></label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".png, .jpg, .jpeg, .gif"
        onChange={(e) => setFile(e.target.files[0])}
        required
      />
      {file ? 
        file.type !== "image/jpeg" && file.type !== "image/jpg" && file.type !== "image/png" ?  
        <p>Format incorrect <b>(.png, .jpg, .jpeg acceptés)</b></p> 
        : file.size > 600000 ? <p>Le fichier dépasse <b>600Ko</b></p> :
        <p>Photo choisie : <span className="photo-alt">{file.name}</span>.<br /> Sauvegarder pour afficher le changement</p> 
        : null}
       
      <input type="submit" disabled={!file || (file.type !== "image/jpeg" && file.type !== "image/jpg" && file.type !== "image/png") || file.size > 600000} value="Upload"/>
      
    </form>
  );
};

export default UploadImg;
