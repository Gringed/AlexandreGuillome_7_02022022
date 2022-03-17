import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";
import postsReducer from "./posts.reducer";
import likesReducer from "./likes.reducer";
import commentsReducer from "./comments.reducer"
import errorsReducer from "./errors.reducer"
import allPostsReducer from "./allPosts.reducer"

export default combineReducers({
    userReducer, usersReducer, postsReducer, likesReducer, commentsReducer, errorsReducer, allPostsReducer
})