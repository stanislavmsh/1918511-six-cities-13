import { SortingOption } from '../../const';
import { describe , it , expect} from 'vitest';
import { cityNameChange, formFavStatus, offersData , sortOffers, sortOffersByCity } from './offers-data.slice';
import { makeFakeOffersList } from '../../utils/mocks';

import { fetchFavAction, fetchOffersAction } from './offers-data.action';
import { store } from '..';


describe('offersData reducers', () => {

  const initialState = {
    cityName: 'Paris',
    offers: [],
    isOffersDataLoading: false,
    sortedOffers: [],
    hasError: false,
    favorites: [],
  };

  const offersMock = makeFakeOffersList();

  it('should return an array only with one city name to state', () => {
    const state = {...initialState , offers: [...offersMock]};
    const actionPayload = 'Amsterdam';
    const newState = offersData.reducer(state , sortOffersByCity(actionPayload));

    const expectedState = [...offersMock].filter((elem) => elem.city.name === actionPayload);

    expect(newState.sortedOffers).toEqual(expectedState);
  });

  it('should change cityName in state', () => {
    const actionPayload = 'Amsterdam';
    const newState = offersData.reducer(initialState , cityNameChange(actionPayload));

    expect(newState.cityName).toBe('Amsterdam');

  });

  it('should sort offers by the selected sorting option', () => {
    const state = {...initialState, sortedOffers: [...offersMock]};
    const actionPayload = SortingOption.HighToLow;
    const newState = offersData.reducer(state, sortOffers(actionPayload));

    const expectedState = [...offersMock].sort((a, b) => b.price - a.price);

    expect(newState.sortedOffers).toEqual(expectedState);

  });

  it('should update favourite status and fill favourites in state with only positive status', () => {
    const state = {...initialState, offers: [...offersMock], sortedOffers: [...offersMock]};
    const actionPayload = {currentId: '1' , favStatus: true};
    const newState = offersData.reducer(state, formFavStatus(actionPayload));

    const expectedStateFavorites = [...offersMock].filter((elem) =>
      elem.isFavorite === true
    );
    const expectedOffers = [...offersMock].map((elem) => {
      if (elem.id === actionPayload.currentId) {
        return {...elem, isFavorite: actionPayload.favStatus};
      }
      return elem;
    });
    const expectedSortedOffers = [...offersMock].map((elem) => {
      if (elem.id === actionPayload.currentId) {
        return {...elem, isFavorite: actionPayload.favStatus};
      }
      return elem;
    });

    expect(newState.favorites).toEqual(expectedStateFavorites);
    expect(newState.offers).toEqual(expectedOffers);
    expect(newState.sortedOffers).toEqual(expectedSortedOffers);

  });

  it('should fetch offers list , sort it by specific city and put city name to state' , async () => {
    const result = await store.dispatch(fetchOffersAction());
    const offersFromServer = result.payload;
    const stateCityName = store.getState().OFFERS.cityName;
    const state = store.getState().OFFERS;

    expect(result.type).toBe('data/fetchOffers/fulfilled');
    expect(state.offers).toEqual(offersFromServer);
    expect(stateCityName).toEqual('Paris');

  });

  it.fails('should reject if not logged in',async () => {
    const result = await store.dispatch(fetchFavAction());
    const favsFromServer = result.payload;
    // const state = store.getState().OFFERS.favorites;
    expect(result.type).toBe('data/fetchFavs/fulfilled');
    expect(favsFromServer).toEqual(undefined);
  });


});
