import { toastr } from 'react-redux-toastr';

const INITIAL_STATE = {
  albums: [],
  album:{},
  pagination:{}
};

var _ = require('lodash');

var reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ALBUM_FETCHED':
      return {
        ...state,
        album: action.payload
      }
    case 'ALBUM_CREATED':
      toastr.success("New Album", action.payload.name)
      return state
    case 'ALBUMS_FETCHED':
      let items = []
      if(_.get(action.payload.pagination, 'current_page') > 1){
        items = [...state.albums, ...action.payload.albums];
      }else{
        items = action.payload.albums;
      }
      return {
        ...state,
        albums: items,
        pagination: action.payload.pagination
      }
    case 'ERRORS_FROM_SEARCH_ALBUMS':
      action.payload.errors.forEach(error => toastr.error("Error", error));
      return state
    case 'ALBUM_UPDATED':
      const album = action.payload.album;
      const albums = state.albums.filter(obj => obj.id !== album.id);
      return {
        ...state,
        albums: [...albums, album]
      }
    case 'ERRORS_FROM_ALBUM_UPDATED':
      action.payload.errors.forEach(error => toastr.error("Error", error));
      return state
    case 'ALBUM_REMOVED':
      const id = action.payload.album.id
      return {
        ...state,
        albums: state.albums.filter((album) => {return album.id !== id})
      }
    case 'ERRORS_FROM_ALBUM_REMOVED':
      action.payload.errors.forEach(error =>toastr.error("Error", error));
      return state
    default:
      return state;
  }
}

export default reducer;