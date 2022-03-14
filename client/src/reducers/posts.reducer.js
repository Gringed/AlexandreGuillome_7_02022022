import {
  DELETE_COMMENT,
  DELETE_POST,
  EDIT_COMMENT,
  GET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  UPDATE_POST,
} from "../actions/posts.actions";

const initialState = {};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case LIKE_POST:
      return state.map((post) => {
        if (post.id === action.payload.idPost) {
          return {
            ...post,
            idUserLike: action.payload.idUserLike,
          };
        }
        return post;
      });
    case UNLIKE_POST:
      return state.map((post) => {
        if (post.id === action.payload.idPost) {
          return {
            ...post,
            idUserLike: action.payload.idUserLike,
          };
        }
        return post;
      });
    case UPDATE_POST:
      return state.map((post) => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            message: action.payload.message,
          };
        } else return post;
      });
    case DELETE_POST:
      return state.filter((post) => post.id !== action.payload.postId);
    case EDIT_COMMENT:
      return state.map((comments) => {
        if (comments.id === action.payload.commentId) {
          return {
            ...comments,
            message: action.payload.message
          };
        } else return comments;
      });
      case DELETE_COMMENT:
        return state.filter((comment) => comment.id !== action.payload.commentId);
    default:
      return state;
  }
}
