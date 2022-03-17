import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_AVATAR = "UPLOAD_AVATAR";
export const DELETE_USER = "DELETE_USER";

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

export const deleteUser = (userId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_USER, payload: { userId } });
      })
      .catch((err) => console.log(err));
  };
};
