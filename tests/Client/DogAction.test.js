import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

import * as actions from '../../resources/assets/js/actions';

import * as types from '../../resources/assets/js/actions/types';

describe('WishList Actions', () => {
  it('should create an action to add to wishlist', () => {
    const breed = 'Chihuahua';
    const expectedAction = {
      type: types.ADD_TO_WISHLIST,
      breed
    };
    expect(actions.addToWishList(breed)).toEqual(expectedAction);
  });

  it('should create an action to remove from wishlist', () => {
    const breed = 'Chihuahua';
    const expectedAction = {
      type: types.REMOVE_FROM_WISHLIST,
      breed
    };
    expect(actions.removeFromWishList(breed)).toEqual(expectedAction);
  });

  it('should create an action to highlight a dog from suggestions', () => {
    const breed = 'Chihuahua';
    const expectedAction = {
      type: types.HIGHLIGHT_DOG,
      breed
    };
    expect(actions.highlightDog(breed)).toEqual(expectedAction);
  });

});

describe('SearchActions', () => {
  const mockStore = configureMockStore([thunkMiddleware]);
  const requestData = [
      {
          "id": 21,
          "breed": "Chihuahua",
          "created_at": "2017-12-27 08:02:55",
          "updated_at": null
      },
      {
          "id": 22,
          "breed": "Chihuahua Dachshund",
          "created_at": "2017-12-27 08:02:55",
          "updated_at": null
      },
      {
          "id": 43,
          "breed": "Jack Russell Chihuahua",
          "created_at": "2017-12-27 08:02:55",
          "updated_at": null
      },
      {
          "id": 50,
          "breed": "Long Haired Chihuahua",
          "created_at": "2017-12-27 08:02:55",
          "updated_at": null
      }
  ];

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should create SEARCH_DOG_SUCCESS action when SEARCH_CHANGE is called for the first time', () => {


    fetchMock.get('/api/dogs/chih', { body: requestData, headers: { 'content-type': 'application/json' } });

    const expectedActions = [
      { type: types.SEARCH_DOG_REQUEST },
      { type: types.SEARCH_DOG_SUCCESS, breed: 'chih', dogs: requestData }
    ];

    const store = mockStore({ dogSearch: [] });

    return store.dispatch(actions.searchChange('chih')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create SEARCH_CURRENT_DOGS action when SEARCH_CHANGE has been previously called', () => {

    const expectedAction = {
      type: types.SEARCH_CURRENT_DOGS,
      breed: 'chihuahua d'
    };

    const store = mockStore({ dogSearch: requestData });
    expect(store.dispatch(actions.searchChange('chihuahua d'))).toEqual(expectedAction);

  });

  it('should create SEARCH_DOG_SUCCESS action when dog breed not in current dogSearch', () => {
    const result = [
      {
        "id": 1,
        "breed": "Airedale",
        "created_at": "2017-12-27 08:02:55",
        "updated_at": null
      }
    ];

    fetchMock.get('/api/dogs/airedale', { body: result, headers: { 'content-type': 'application/json' } });

    const expectedActions = [
      { type: types.SEARCH_DOG_REQUEST },
      { type: types.SEARCH_DOG_SUCCESS, breed: 'airedale', dogs: result }
    ];

    const store = mockStore({ dogSearch: requestData });

    return store.dispatch(actions.searchChange('airedale')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create SEARCH_DOG_FAILURE action when search has invalid characters', () => {

    fetchMock.get('/api/dogs/gr8 dane', 404);

    const expectedActions = [
      { type: types.SEARCH_DOG_REQUEST },
      { type: types.SEARCH_DOG_FAILURE }
    ];

    const store = mockStore({dogSearch:[]});
    return store.dispatch(actions.searchChange('gr8 dane')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('SEARCH_DOG_SUCCESS creates dog when search is not in database', () => {
    const result = [
      {
        "id": 1,
        "breed": "Great Dane",
        "created_at": "2017-12-27 08:02:55",
        "updated_at": null
      }
    ]
    fetchMock.get('/api/dogs/Great Dane', { body: [], headers: { 'content-type': 'application/json' } });
    fetchMock.post('/api/dogs', {body: result, headers: { 'content-type': 'application/json' } });

    const expectedActions = [
      { type: types.SEARCH_DOG_REQUEST },
      { type: types.SEARCH_DOG_SUCCESS, breed: 'Great Dane', dogs: result},
    ];

    const store = mockStore({dogSearch:[]});
    return store.dispatch(actions.searchChange('Great Dane')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })
});
