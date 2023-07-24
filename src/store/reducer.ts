import { createReducer } from '@reduxjs/toolkit';
import { cityNameChange, getSortedOffers, sortByRating, sortLowToHigh, sortHighToLow, resetToDefault, getOffers, setError, setLoadingStatus, requireAuth} from './action';
import { OffersList } from '../types/offers-list';
import { AuthStatus } from '../const';

type IinitialState = {
  city: string;
  offers: OffersList[];
  sortedOffers: OffersList[];
  filteredOffers: OffersList[];
  error: string | null;
  isLoading: boolean;
  authStatus: AuthStatus;
}

const initialState: IinitialState = {
  city: 'Paris',
  offers: [],
  sortedOffers: [],
  filteredOffers : [],
  error: null,
  isLoading: false,
  authStatus: AuthStatus.Unknown,
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
    })
    .addCase(setLoadingStatus, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(requireAuth, (state , action) => {
      state.authStatus = action.payload;
    });
});

