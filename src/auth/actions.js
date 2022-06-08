import { toastr } from "react-redux-toastr";
import axios from "axios";
const _ = require("lodash");

export function refreshToken(token){
  return dispatch => {
    dispatch({type:"REFRESH_TOKEN", payload:token})
  }
}

export function login(values) {
  const config = {
    "headers":{
      'Content-Type': process.env.REACT_APP_CONTENTTYPE
    }
  }
  return dispatch => { 
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios.post(`${process.env.REACT_APP_API_URL}/auth/sign_in`, values, config).then(resp => {
      dispatch(
        [
          {
            type: "USER_FETCHED",
            payload: {
              data: resp.data,
              headers: resp.headers,
              permissions: [],
            }
          },
          { type: "HIDE_OVERLAY" },
          {
            type: "REFRESH_TOKEN",
            payload: _.get(resp,"headers.access-token")
          }
        ]
      );
    }).catch(e => {
      if (e.response) {
        if (e.response.data.errors) {
            e.response.data.errors.forEach(error =>
            toastr.error("Erro", error)
          );
        } else {
          toastr.error(String(e.response.status), e.response.statusText);
        }
      } else if (e.request) {
        if (e.message === "Network Error") {
          toastr.error("Erro", "Servidor OFFLINE");
        }
      }
      dispatch([{ type: "HIDE_OVERLAY" }]);
    });
  };
}

export function register(values) {
  const config = {
    "headers":{
      'Content-Type': process.env.REACT_APP_CONTENTTYPE
    }
  }
  return dispatch => { 
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios.post(`${process.env.REACT_APP_API_URL}/auth`, values, config).then(resp => {
      dispatch(
        [
          {
            type: "USER_FETCHED",
            payload: {
              data: resp.data,
              headers: resp.headers,
              permissions: [],
            }
          },
          { type: "HIDE_OVERLAY" },
          {
            type: "REFRESH_TOKEN",
            payload: _.get(resp,"headers.access-token")
          }
        ]
      );
    }).catch(e => {
      if (e.response) {
        if (e.response.data.errors) {
            e.response.data.errors.forEach(error =>
            toastr.error("Erro", error)
          );
        } else {
          toastr.error(String(e.response.status), e.response.statusText);
        }
      } else if (e.request) {
        if (e.message === "Network Error") {
          toastr.error("Erro", "Servidor OFFLINE");
        }
      }
      dispatch([{ type: "HIDE_OVERLAY" }]);
    });
  };
}

export function logout(data) {
  const config = {
    headers:{
      "uid": _.get(data,"uid"),
      "client":_.get(data,"client"),
      "access-token": _.get(data,"access-token"),
      'Content-Type': process.env.REACT_APP_CONTENTTYPE
    }
  }
  return dispatch => {
    axios.delete(`${process.env.REACT_APP_API_URL}/auth/sign_out`, config)
    .then(resp => {
      if(resp.data.success){
        dispatch({ type: "LOGOUT" })
      }
    }).catch(e => {
      if (e.response) {
        if (e.response.data.errors) {
          e.response.data.errors.forEach(error =>
            toastr.error("Erro", error)
          );
        } else {
          toastr.error(String(e.response.status), e.response.statusText);
        }
      } else if (e.request) {
        if (e.message === "Network Error") {
          dispatch({ type: "TOKEN_VALIDATED", payload: false })
          toastr.error("Erro", "Servidor OFFLINE");
        }
      }
    });
  };
}

export function validateToken(data) {
  const config = {
    headers:{
      "uid": _.get(data,"uid"),
      "client":_.get(data,"client"),
      "access-token": _.get(data,"access-token"),
      'Content-Type': process.env.REACT_APP_CONTENTTYPE
    }
  }
  return dispatch => {
    axios.get(`${process.env.REACT_APP_API_URL}/auth/validate_token`,config)
      .then(resp => {
        dispatch([
          {type: "TOKEN_VALIDATED", payload: resp.data.success || false},
          {type: "REFRESH_TOKEN", payload: _.get(resp,"headers.access-token")}
        ]);
      })
      .catch(e => {
        if (e.response) {
          if (e.response.data.errors) {
              e.response.data.errors.forEach(error =>
              toastr.error("Erro", error)
            );
          } else {
            toastr.error(String(e.response.status), e.response.statusText);
          }
        } else if (e.request) {
          if (e.message === "Network Error") {
            toastr.error("Erro", "Servidor OFFLINE");
          }
        }
        dispatch({ type: "TOKEN_VALIDATED", payload: false });
      });
  };
}