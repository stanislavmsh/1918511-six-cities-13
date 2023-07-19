import { createReducer } from '@reduxjs/toolkit';
import { cityNameChange, getSortedOffers} from './action';
import { OffersList } from '../types/offers-list';
import { offers } from '../mocks/offers';

type IinitialState = {
  city: string;
  offers: OffersList[];
  sortedOffers: OffersList[];
}

const initialState: IinitialState = {
  'city': 'Paris', // Paris
  'sortedOffers': [],
  offers,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(cityNameChange, (state , action) => {
      state.city = action.payload.city;
    })
    .addCase(getSortedOffers, (state, action) => {
      state.sortedOffers = state.offers.filter((elem) => elem.city.name === action.payload.cityName); // узнать почему нельзя взаимодействовать с offers а только со state.offers
    });
});

