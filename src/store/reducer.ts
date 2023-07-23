import { createReducer } from '@reduxjs/toolkit';
import { cityNameChange, getSortedOffers, sortByRating, sortLowToHigh, sortHighToLow, resetToDefault, getOffers, setError} from './action';
import { OffersList } from '../types/offers-list';
// import { offers } from '../mocks/offers';

type IinitialState = {
  city: string;
  offers: OffersList[];
  sortedOffers: OffersList[];
  filteredOffers: OffersList[];
  error: string | null;

}

const initialState: IinitialState = {
  city: 'Paris',
  offers: [],
  sortedOffers: [],
  filteredOffers : [],
  error: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getOffers, (state, action) => {
      state.offers = [...action.payload];
    })
    .addCase(cityNameChange, (state , action) => {
      state.city = action.payload.city;
    })
    .addCase(getSortedOffers, (state, action) => {
      state.sortedOffers = state.offers.filter((elem) => elem.city.name === action.payload.cityName);
      state.filteredOffers = state.sortedOffers;
    })
    .addCase(resetToDefault, (state) => {
      state.sortedOffers = state.filteredOffers;
    })
    .addCase(sortLowToHigh, (state) => {
      state.sortedOffers.sort((a , b) => a.price - b.price);
    })
    .addCase(sortHighToLow, (state) => {
      state.sortedOffers.sort((a, b) => b.price - a.price);
    })
    .addCase(sortByRating, (state) => {
      state.sortedOffers.sort((a , b) => b.rating - a.rating);
    })
    .addCase(setError,(state , action) => {
      state.error = action.payload;
    });
});

