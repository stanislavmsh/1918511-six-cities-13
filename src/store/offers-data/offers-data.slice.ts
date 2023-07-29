import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace , SortingOption} from '../../const';
import { OffersData } from '../../types/state';
import { fetchOffersAction } from './offers-data.action';
// import { OffersList } from '../../types/offers-list';

const initialState: OffersData = {
  cityName: 'Paris',
  offers: [],
  isOffersDataLoading: false,
  sortedOffers: [],
  filteredOffers: [],
  hasError: false,
};
export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers:{
    sortOffersByCity: (state, action: PayloadAction<string>) => {
      state.sortedOffers = state.offers.filter((elem) => elem.city.name === action.payload);
      state.filteredOffers = state.sortedOffers;
    },
    cityNameChange: (state, action: PayloadAction<string>) => {
      state.cityName = action.payload;
    },
    sortOffers: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case SortingOption.LowToHigh:
          state.sortedOffers.sort((a, b) => a.price - b.price);
          break;
        case SortingOption.HighToLow:
          state.sortedOffers.sort((a, b) => b.price - a.price);
          break;
        case SortingOption.Top:
          state.sortedOffers.sort((a, b) => b.rating - a.rating);
          break;
        default:
          state.sortedOffers = state.filteredOffers;
          break;
      }
      state.cityName = action.payload;
    },

  },
  extraReducers:(builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload.data;
        state.isOffersDataLoading = false;
        state.cityName = action.payload.city;
        state.sortedOffers = action.payload.data.filter((elem) => elem.city.name === state.cityName);
        state.filteredOffers = state.sortedOffers;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.cityName = 'Paris';
        state.offers = [];
        state.hasError = true;
      });

  }
});


export const { sortOffersByCity, cityNameChange, sortOffers } = offersData.actions;
