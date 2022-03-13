import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";
import postsReducer from "./posts.reducer";
import likesReducer from "./likes.reducer";

export default combineReducers({
    userReducer, usersReducer, postsReducer, likesReducer
})