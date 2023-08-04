import { SortingOption } from '../../const';

import { cityNameChange, formFavStatus, offersData , sortOffers, sortOffersByCity } from './offers-data.slice';
import { offersMock } from './offers.mock';
// import MockAdapter from 'axios-mock-adapter';
// import { createAPI } from '../../services/api';


// import { store } from '..';
// import { beforeAll } from 'vitest';

// const api = createAPI();
// const getListResponse = {
//   offer: {
//     offersMock
//   }
// };


// const mockNetworkResponse = () => {
//   const mock = new MockAdapter(api);
//   mock.onGet('/offers/Paris').reply(200, getListResponse);
// };


describe('offersData reducers', () => {
  // beforeAll(() => {
  //   mockNetworkResponse();
  // });


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

  // test('should fetch offers list , sort it by specific city and put city name to state' , async () => {


  //   const result = await store.dispatch(fetchOffersAction(CityName.Paris));
  //   const serverOffers = result.payload.data;
  //   const serverCityName = result.payload.city;
  //   // console.log(serverCityName);
  //   const stateCityName = store.getState().OFFERS.cityName;

  //   expect(result.type).toBe('data/fetchOffers/fulfilled');
  //   // expect(offersFromServer).toEqual(getListResponse.offer);
  //   const state = store.getState().OFFERS;
  //   console.log(state.offers.length);
  //   console.log(serverOffers.length);
  //   // expect(state.offers).toEqual({ serverOffers });
  //   expect(stateCityName).toEqual(CityName.Paris);

  // });


});
