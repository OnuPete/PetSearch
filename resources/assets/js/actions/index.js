import 'isomorphic-fetch';
import * as types from './types';
import filterBreed from '../util/filter';

export function addToWishList(breed) {
  return {
    type: types.ADD_TO_WISHLIST,
    breed
  };
}
export function removeFromWishList(breed) {
  return {
    type: types.REMOVE_FROM_WISHLIST,
    breed
  };
}
export function highlightDog(breed) {
  return {
    type: types.HIGHLIGHT_DOG,
    breed
  };
}

export function searchCurrentDogs(breed) {
  return {
    type: types.SEARCH_CURRENT_DOGS,
    breed
  };
}

export function searchDogRequest() {
  return {
    type: types.SEARCH_DOG_REQUEST,
  };
}

export function searchDogSuccess(breed, dogs) {
  return {
    type: types.SEARCH_DOG_SUCCESS,
    breed,
    dogs
  };
}

export function searchDogFailure() {
  return {
    type: types.SEARCH_DOG_FAILURE,
  };
}

export function searchChange(breed) {
  return (dispatch, getState) => {
    const dogSearch = filterBreed(getState().dogSearch,breed);
    console.log('ayayayyyayayyay', dogSearch);
    if (dogSearch.length > 0) return dispatch(searchCurrentDogs(breed));
    else {
      dispatch(searchDogRequest());
      const search = breed.length > 0? `/${breed}`: '';
      return fetch(`/api/dogs${search}`)
        .then(res => {
          if(!res.ok) throw new Error();
          return res.json();
        })
        .then(data => {
          if (data.length === 0) {
            return fetch('/api/dogs', { method: 'post', body: JSON.stringify({breed}) });
          } else return data;
        })
        .then(res => {
          if(res.hasOwnProperty('ok') && !res.ok) throw new Error(res.statusText);
          else if (res.hasOwnProperty('ok') && res.ok) return res.json();
          else return res;
        })
        .then(dogs => {
          dispatch(searchDogSuccess(breed, dogs));
        })
        .catch((e) => {
          dispatch(searchDogFailure())
        });
    }

  };
}
