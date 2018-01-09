import * as types from '../actions/types';
import filterBreed from '../util/filter';

const initialState = {
  dogWishList: [],
  dogSearch: [{breed: 'Search a breed.'}],
  currentDog: '',
  highlightedDog: '',
}

export default function reducers(state = initialState, action) {
  switch(action.type) {
    case types.INIT_SEARCH:
      return {
        ...state,
        dogSearch: [{ breed: 'Search a breed.'}]
      }
    case types.ADD_TO_WISHLIST:
      return {
        ...state,
        dogWishList: [...state.dogWishList, action.breed]
      }
    case types.REMOVE_FROM_WISHLIST:
      const dogWishList = state.dogWishList.filter(breed => breed !== action.breed);
      return {
        ...state,
        dogWishList
      }
    case types.HIGHLIGHT_DOG:
      return {
        ...state,
        highlightedDog: action.breed
      }
    case types.SEARCH_CURRENT_DOGS:
      const dogSearch = filterBreed(state.dogSearch, action.breed);
      return {
        ...state,
        currentDog: action.breed,
        dogSearch
      }
    case types.SEARCH_DOG_REQUEST:
      return {
        ...state,
        dogSearch: [{ breed: 'Loading...' }]
      }
    case types.SEARCH_DOG_SUCCESS:
      return {
        ...state,
        currentDog: action.breed,
        dogSearch: action.dogs
      }
    case types.SEARCH_DOG_FAILURE:
      return {
        ...state,
        dogSearch: [{ breed: 'Check your spelling.' }]
      }

    default:
      return state;
  }
}
