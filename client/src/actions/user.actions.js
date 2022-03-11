import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_AVATAR = "UPLOAD_AVATAR";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadAvatar = (data, id) => {
  return (dispatch) => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}api/user/${id}`, data)
      .then((res) => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
          .then((res) => {
            dispatch({ type: UPLOAD_AVATAR, payload: res.data.avatar });
          });
      })
      .catch((err) => console.log(err));
  };
};
