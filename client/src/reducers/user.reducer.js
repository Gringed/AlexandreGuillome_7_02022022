import { GET_USER, UPLOAD_AVATAR } from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action){
    switch(action.type){
        case GET_USER:
            return action.payload
        case UPLOAD_AVATAR:
            return {
                ...state, avatar: action.payload
            }
        default:
            return state;
    }
}