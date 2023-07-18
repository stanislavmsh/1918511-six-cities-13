import { createReducer } from '@reduxjs/toolkit';
import { getOffers , cityNameChange, getCurrentStateOffers} from './action';
import { OffersList } from '../types/offers-list';
import { offers } from '../mocks/offers';

type IinitialState = {
  city: string;
  offers: OffersList[];
}

const initialState: IinitialState = {
  'city': 'Paris', // Paris
  'offers': offers,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(cityNameChange, (state , action) => {
      state.city = action.payload.city;
    })
    .addCase(getCurrentStateOffers, (state) => {
      state.offers = [...state.offers];
    })
    .addCase(getOffers, (state, action) => {
      state.offers = state.offers.filter((elem) => elem.city.name === action.payload.cityName);
    });
});

