import { PHOTOS_LOADED } from './actionTypes';
export function loadPhotos() {
  return function(dispatch) {
    fetch('/images').then(result => result.json())
      .then(result => dispatch( {type: PHOTOS_LOADED, payload: result}));
  }
}
