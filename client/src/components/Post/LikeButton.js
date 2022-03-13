import React, { useContext, useEffect, useState } from 'react';
import {UidContext} from '../AppContext' 
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { useDispatch, useSelector } from 'react-redux';
import { likePost, unLikePost } from '../../actions/posts.actions';
const LikeButton = ({post}) => {
    const [likedUp, setLikedUp] = useState(false)
    const likesData = useSelector((state) => state.likesReducer);
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext)
    const dispatch = useDispatch();

    const handleLike = () => { 
        dispatch(likePost(post.id, uid))
        setLiked(true)
    }

    const handleUnlike = () => {
        dispatch(unLikePost(post.id, uid))
        setLiked(false)
    }
    const filterId = likesData.find((like => like.idUserLike === uid && like.idPost === post.id) ) 
    useEffect(() => {
        
        if (filterId) {
            setLiked(true);
        }
            
        else{
            setLiked(false)
        } 
        
    }, [uid, filterId, dispatch])
    
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
           {<span>{post.likes}</span>}
       </div>
    );
};

export default LikeButton;