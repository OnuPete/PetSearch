import reducers from '../../resources/assets/js/reducers';
import * as types from '../../resources/assets/js/actions/types';
import * as actions from '../../resources/assets/js/actions';

describe('Dog reducers', () => {
  let dogState

  beforeEach(() => {
    dogState = reducers(undefined, {});
  })

  it('should return the initial state', () => {
    expect(dogState).toEqual({
      dogWishList: [],
      dogSearch: [],
      currentDog: '',
      highlightedDog: '',
    });
  });

  it('should add to dogWishList', () => {
    dogState = reducers(dogState, actions.addToWishList('Airedale'));
    expect(dogState.dogWishList).toEqual(['Airedale']);

    dogState = reducers(dogState, actions.addToWishList('Chihuahua'));
    expect(dogState.dogWishList).toEqual(['Airedale', 'Chihuahua']);
  });

  it('should remove from dogWishList', () => {
    dogState = reducers(dogState, actions.addToWishList('Airedale'));
    expect(dogState.dogWishList).toEqual(['Airedale']);

    dogState = reducers(dogState, actions.removeFromWishList('Airedale'));
    expect(dogState.dogWishList).toEqual([]);
  });

  it('should highlight a dog', () => {
    dogState = reducers(dogState, actions.highlightDog('Airedale'));
    expect(dogState.highlightedDog).toEqual('Airedale');

    dogState = reducers(dogState, actions.highlightDog(''));
    expect(dogState.highlightedDog).toEqual('');
  });

  it('handle SEARCH_CURRENT_DOGS', () => {
    const result = [
      {
        "id": 1,
        "breed": "Airedale",
        "created_at": "2017-12-27 08:02:55",
        "updated_at": null
      },
      {
        "id": 50,
        "breed": "Long Haired Chihuahua",
        "created_at": "2017-12-27 08:02:55",
        "updated_at": null
      },
      {
        "id": 51,
        "breed": "Long Haired Dachshund",
        "created_at": "2017-12-27 08:02:55",
        "updated_at": null
      }
    ];
    dogState.dogSearch = result;
    dogState = reducers(dogState, actions.searchCurrentDogs('aireda'));
    
    expect(dogState.currentDog).toBe('aireda');
    expect(dogState.dogSearch).toEqual([
      {
        "id": 1,
        "breed": "Airedale",
        "created_at": "2017-12-27 08:02:55",
        "updated_at": null
      }]);
  });

  it('handle SEARCH_DOG_REQUEST', () => {
    dogState = reducers(dogState, actions.searchDogRequest());
    expect(dogState.dogSearch).toEqual(['Loading...']);
  });

  it('handle SEARCH_DOG_SUCCESS', () => {
    const result = [
      {
        "id": 1,
        "breed": "Airedale",
        "created_at": "2017-12-27 08:02:55",
        "updated_at": null
      },
      {
        "id": 50,
        "breed": "Long Haired Chihuahua",
        "created_at": "2017-12-27 08:02:55",
        "updated_at": null
      },
      {
        "id": 51,
        "breed": "Long Haired Dachshund",
        "created_at": "2017-12-27 08:02:55",
        "updated_at": null
      }
    ]
    dogState = reducers(dogState, actions.searchDogSuccess('aired', result));
    expect(dogState.dogSearch).toEqual(result);
    expect(dogState.currentDog).toEqual('aired');
  });

  it('handle SEARCH_DOG_FAILURE', () => {
    dogState = reducers(dogState, actions.searchDogFailure());
    expect(dogState.dogSearch).toEqual(['Check your spelling.']);
  });
})
