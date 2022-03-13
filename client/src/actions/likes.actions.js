import axios from "axios";

export const GET_LIKES = "GET_LIKES";

export const getLikes = () => {
    return (dispatch) => {
        return axios.get(`${process.env.REACT_APP_API_URL}api/post/likes`)
        .then((res) => {
            dispatch({ type: GET_LIKES, payload: res.data})
        })
        .catch((err) => console.log(err))
    }
}