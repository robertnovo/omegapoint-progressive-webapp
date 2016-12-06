import reducer from './imageReducer.js';
import * as types from '../actions/actionTypes.js';

describe('images reducer', () => {

  let originalArr = {
    items: [
      { media: { m: 'urlThree' } },
      { media: { m: 'urlTwo' } },
      { media: { m: 'urlOne' } },
    ]
  };

  it('default should return initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should return same array if same is provided', () => {
    expect(
      reducer([{
        url: 'urlOne',
        height: 200,
        width: 200,
      }], {
        type: types.PHOTOS_LOADED,
        payload: originalArr
      })
    ).toEqual([
      {
        url: 'urlThree',
        height: 200,
        width: 200,
      },
      {
        url: 'urlTwo',
        height: 200,
        width: 200,
      },
      {
        url: 'urlOne',
        height: 200,
        width: 200,
      },
    ])
  });
});
