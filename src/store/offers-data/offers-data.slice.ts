import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace , SortingOption} from '../../const';
import { TOffersData } from '../../types/state';
import { fetchFavAction, fetchOffersAction } from './offers-data.action';


const initialState: TOffersData = {
  cityName: 'Paris',
  offers: [],
  isOffersDataLoading: false,
  sortedOffers: [],
  hasError: false,
  favorites: [],
};
export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers:{
    sortOffersByCity: (state, action: PayloadAction<string>) => {
      state.sortedOffers = state.offers.filter((elem) => elem.city.name === action.payload);
    },
    cityNameChange: (state, action: PayloadAction<string>) => {
      state.cityName = action.payload;
    },
    sortOffers: (state, action: PayloadAction<SortingOption>) => {
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
          state.sortedOffers = state.offers.filter((elem) => elem.city.name === state.cityName);
          break;
      }
    },
    formFavStatus : (state, action: PayloadAction<{currentId: string ; favStatus: boolean}>) => {
      state.offers = state.offers.map((elem) => {
        if (elem.id === action.payload.currentId) {
          return {...elem, isFavorite: action.payload.favStatus};
        }
        return elem;
      });

      state.sortedOffers = state.sortedOffers.map((elem) => {
        if (elem.id === action.payload.currentId) {
          return {...elem, isFavorite: action.payload.favStatus};
        }
        return elem;
      });

      state.favorites = state.offers.filter((elem) =>
        elem.isFavorite === true
      );

    }

  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload.data;
        state.isOffersDataLoading = false;
        state.cityName = action.payload.city;
        state.sortedOffers = action.payload.data.filter((elem) => elem.city.name === state.cityName);
      })
      .addCase(fetchFavAction.fulfilled , (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.cityName = 'Paris';
        state.offers = [];
        state.hasError = true;
      })
      .addCase(fetchFavAction.rejected, (state) => {
        state.favorites = [];
      });
  }
});


export const { sortOffersByCity, cityNameChange, sortOffers , formFavStatus} = offersData.actions;
