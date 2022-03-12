import React, { useContext, useEffect, useState } from 'react';
import {UidContext} from '../AppContext' 
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import * as Icons from 'react-icons/bi'
const LikeButton = ({post, likes}) => {
    
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext)

    const handleLike = () => {

    }

    const handleUnlike = () => {

    }

    useEffect(() => {
        if(post.idPost === 1) setLiked(true)
    
    }, [uid, post, liked])

    return (
       <div className="like-container">
           {!uid &&
           <Popup trigger={<img src='./img/icons/heart.svg' alt=""/>} position={['bottom center', 'bottom right', 'bottom left']} closeOnDocumentClick>
               <div>Connectez-vous pour aimer un post</div>
           </Popup>
            }
           {uid && liked === false && (
            <img src='./img/icons/heart.svg' onClick={handleLike} alt=""/>
           )}
           {uid && liked && (
            <img src='./img/icons/heart-filled.svg' onClick={handleUnlike} alt=""/>
           )}
       </div>
    );
};

export default LikeButton;