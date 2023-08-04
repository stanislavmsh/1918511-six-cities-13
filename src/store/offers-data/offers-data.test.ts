import { SortingOption } from '../../const';

import { cityNameChange, formFavStatus, offersData , sortOffers, sortOffersByCity } from './offers-data.slice';
import { offersMock } from './offers.mock';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../services/api';

import { fetchOffersAction } from './offers-data.action';
import { store } from '..';
import { beforeAll } from 'vitest';


const getListResponse = {
  someOffers : {
    offersMock
  }
};


const mockNetworkResponse = () => {
  const mock = new MockAdapter(createAPI());
  mock.onGet().reply(200, getListResponse);
  console.log('mockNetwork START');
};


describe('offersData reducers', () => {
  beforeAll(() => {
    mockNetworkResponse();
  });


  const initialState = {
    cityName: 'Paris',
    offers: offersMock,
    isOffersDataLoading: false,
    sortedOffers: offersMock,
    hasError: false,
    favorites: [],
  };

  test('should return an array only with one city name to state', () => {
    const actionPayload = 'Amsterdam';
    const newState = offersData.reducer(initialState , sortOffersByCity(actionPayload));

    expect(newState.sortedOffers).toEqual(
      [
        initialState.offers[0],
        initialState.offers[1]
      ]
    );
  });

  test('should change cityName in state', () => {
    const actionPayload = 'Amsterdam';
    const newState = offersData.reducer(initialState , cityNameChange(actionPayload));

    expect(newState.cityName).toBe('Amsterdam');

  });

  test('should sort offers by the selected sorting option', () => {
    const actionPayload = SortingOption.HighToLow;
    const newState = offersData.reducer(initialState, sortOffers(actionPayload));

    expect(newState.sortedOffers).toEqual(
      [
        initialState.offers[2],
        initialState.offers[1],
        initialState.offers[3],
        initialState.offers[0]
      ]
    );

  });

  test('should update favourite status and fill favourites in state with only positive status', () => {
    const actionPayload = {currentId: '1' , favStatus: true};
    const newState = offersData.reducer(initialState, formFavStatus(actionPayload));

    expect(newState.offers[0].isFavorite).toBe(true);
    expect(newState.sortedOffers[0].isFavorite).toBe(true);
    expect(newState.favorites).toEqual(
      [
        {...initialState.offers[0] , isFavorite: true},
        initialState.offers[2],
        initialState.offers[3]
      ]
    );
  });

  test('should fetch offers list , sort it by specific city and put city name to state' , async () => {
    const result = await store.dispatch(fetchOffersAction());
    const offersFromServer = result.payload;
    const stateCityName = store.getState().OFFERS.cityName;
    const state = store.getState().OFFERS;

    // expect(offersFromServer.someOffers).toEqual(getListResponse.someOffers);
    expect(result.type).toBe('data/fetchOffers/fulfilled');
    expect(state.offers).toEqual(offersFromServer);
    expect(stateCityName).toEqual('Paris');

  });


});
