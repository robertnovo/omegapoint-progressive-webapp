import {PHOTOS_LOADED} from '../actions/actionTypes.js';
import _ from 'lodash';

function imageHelperStuff(oldImages, newImages) {
  let urlIfied = newImages.map(image => {
    return {
      url: image.media.m,
      height: 200,
      width: 200,
    }
  });
  return _.unionBy(urlIfied, oldImages, 'url');
}

export default function reducer(state = [], action) {
  switch (action.type) {
    case PHOTOS_LOADED:
    return imageHelperStuff(state, action.payload.items)
  default:
    return state;
  }
}
