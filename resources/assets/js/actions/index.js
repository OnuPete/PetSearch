import 'isomorphic-fetch';

import * as types from './types';
import cachedFetch from '../util/fetch';
import filterBreed from '../util/filter';

export function searchInit() {
  return {
    type: types.INIT_SEARCH
  }
}

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
    if (breed.length === 0) return dispatch(searchInit());
    else {
      dispatch(searchDogRequest());
      return cachedFetch(`/api/search/dogs?breed=${breed}`)
        .then(res => {
          if(!res.ok) throw new Error();
          return res.json();
        })
        .then(dogs => {
          if(dogs.length === 0) throw Error();
          dispatch(searchDogSuccess(breed, dogs));
        })
        .catch((e) => {
          dispatch(searchDogFailure())
        });
    }
  };
}

export function postDog(breed) {
  return (dispatch, getState) => {
    if (breed.length === 0) return dispatch(searchInit());
    else {
      dispatch(searchDogRequest());
      return cachedFetch('/api/dogs', {
        method: 'post',
        body: JSON.stringify({breed})
      })
        .then(res => {
          if(!res.ok) throw new Error();
          return res.json();
        })
        .then(dogs => {
          // dispatch(addToWishList(dogs[0].breed));
          if(dogs.length === 0) throw Error();
          dispatch(searchDogSuccess(breed, dogs));
        })
        .catch((e) => {
          dispatch(searchDogFailure())
        });
    }
  };
}
