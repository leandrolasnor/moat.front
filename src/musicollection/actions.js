import { toastr } from "react-redux-toastr";
import axios from "axios";
const _ = require("lodash");

export function search_albums(query){
  return dispatch => { 
    axios.get(`${process.env.REACT_APP_API_URL}/albums/search/${query}`,).then(resp => {}).catch(e => {
      if (e.response) {
        if (e.response.data.errors) {
            e.response.data.errors.forEach(error => toastr.error("Error", error));
        } else {toastr.error(String(e.response.status), e.response.statusText);}
      } else if (e.request) {toastr.error("Error", e.message);}
    });
  };
}

export function delete_album(id){
  return dispatch => { 
    axios.delete(`${process.env.REACT_APP_API_URL}/albums/${id}`).then(resp => {}).catch(e => {
      if (e.response) {
        if (e.response.data.errors) {
            e.response.data.errors.forEach(error => toastr.error("Error", error));
        } else {toastr.error(String(e.response.status), e.response.statusText);}
      } else if (e.request) {toastr.error("Error", e.message);}
    });
  };
}

export function create_album(album){
  return dispatch => { 
    axios.post(`${process.env.REACT_APP_API_URL}/albums`, album).then(resp => {}).catch(e => {
      if (e.response) {
        if (e.response.data.errors) {
            e.response.data.errors.forEach(error => toastr.error("Error", error));
        } else {toastr.error(String(e.response.status), e.response.statusText);}
      } else if (e.request) {toastr.error("Error", e.message);}
    });
  };
}

export function update_album(album){
  return dispatch => { 
    axios.put(`${process.env.REACT_APP_API_URL}/albums/${album.id}`, album).then(resp => {}).catch(e => {
      if (e.response) {
        if (e.response.data.errors) {
            e.response.data.errors.forEach(error => toastr.error("Error", error));
        } else {toastr.error(String(e.response.status), e.response.statusText);}
      } else if (e.request) {toastr.error("Error", e.message);}
    });
  };
}

export function show_album(id){
  return dispatch => {
    dispatch({type: 'ALBUM_FETCHED', payload: {}})
    axios.put(`${process.env.REACT_APP_API_URL}/albums/${id}`).then(resp => {
      dispatch({type: 'ALBUM_FETCHED', payload: resp.data})
    }).catch(e => {
      if (e.response) {
        if (e.response.data.errors) {
            e.response.data.errors.forEach(error => toastr.error("Error", error));
        } else {toastr.error(String(e.response.status), e.response.statusText);}
      } else if (e.request) {toastr.error("Error", e.message);}
    });
  };
}