import { GET_POSTS, GET_LIKES, LIKE_POST } from "../actions/posts.actions";

const initialState = {};

export default function postsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return action.payload;
        case GET_LIKES:
            return action.payload;
        case LIKE_POST:
            return state.map((post) => {
                if(post.id === action.payload.idPost){
                    return {
                        ...post, likes: action.payload.idUserLike
                    }
                }
            
            })
            
        default:
            return state
        }
}