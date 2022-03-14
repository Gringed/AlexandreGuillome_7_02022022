import axios from "axios";

export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const getPosts = (num) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post`)
      .then((res) => {
        const array = res.data.slice(0, num);
        dispatch({ type: GET_POSTS, payload: array });
      })
      .catch((err) => console.log(err));
  };
};

export const likePost = (idPost, idUserLike) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/post/like-post/` + idPost,
      data: { idUserLike: idUserLike },
    })
      .then((res) => {
        dispatch({ type: LIKE_POST, payload: { idUserLike } });
      })
      .catch((err) => console.log(err));
  };
};

export const unLikePost = (idPost, idUserLike) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/post/unlike-post/` + idPost,
      data: { idUserLike: idUserLike },
    })
      .then((res) => {
        dispatch({ type: UNLIKE_POST, payload: { idUserLike } });
      })
      .catch((err) => console.log(err));
  };
};

export const updatePost = (postId, message) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      data: { message },
    })
      .then((res) => {
        dispatch({ type: UPDATE_POST, payload: { message, postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const addComment = (postId, userId, message, firstname, lastname) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/post/comment-post/${postId}`,
      data: { userId, message, firstname, lastname },
    })
      .then((res) => {
        dispatch({
          type: ADD_COMMENT,
          payload: { postId, firstname, lastname },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const editComment = (postId, commentId, message) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/post/edit-comment-post/${commentId}`,
      data: {postId, commentId, message }
    })
      .then((res) => {
        dispatch({
          type: EDIT_COMMENT,
          payload: {postId, commentId, message },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteComment = (commentId, idPost) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/post/delete-comment-post/${commentId}`,
      data: {commentId, idPost}
    })
      .then((res) => {
        dispatch({
          type: DELETE_COMMENT,
          payload: {commentId, idPost},
        });
      })
      .catch((err) => console.log(err));
  };
};
