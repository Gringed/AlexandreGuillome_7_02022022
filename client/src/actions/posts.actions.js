import axios from "axios";

export const GET_POSTS = "GET_POSTS";
export const GET_LIKES = "GET_LIKES";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";


export const getPosts = () => {
    return (dispatch) => {
        return axios.get(`${process.env.REACT_APP_API_URL}api/post`)
        .then((res) => {
            dispatch({ type: GET_POSTS, payload: res.data})
        })
        .catch((err) => console.log(err))
    }
}

export const getLikes = () => {
    return (dispatch) => {
        return axios.get(`${process.env.REACT_APP_API_URL}api/post/likes`)
        .then((res) => {
            dispatch({ type: GET_LIKES, payload: res.data})
        })
        .catch((err) => console.log(err))
    }
}

export const likePost = (idPost, idUserLike) => {
    return (dispatch) => {
        return axios.put(`${process.env.REACT_APP_API_URL}api/post/like-post/` + idPost, idUserLike).then((res) => {
            dispatch({type: LIKE_POST, payload: {idPost, idUserLike}})
        }).catch((err) => console.log(err))
    }
}