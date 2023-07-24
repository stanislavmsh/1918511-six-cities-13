import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { APIRoute , CityName, TIMEOUT_SHOW_ERROR } from '../const';
import { OffersList } from '../types/offers-list';
import { getOffers, getSortedOffers, setError, setLoadingStatus } from './action';
import { store } from '.';

export const fetchOffersAction = createAsyncThunk<void, CityName, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (city , { dispatch, extra: api}) => {
    dispatch(setLoadingStatus(true));
    const {data} = await api.get<OffersList[]>(APIRoute.Offers);
    dispatch(setLoadingStatus(false));
    dispatch(getOffers(data));
    dispatch(getSortedOffers({cityName : city}));
  }
);

export const clearErrorAction = createAsyncThunk(
  'data/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  }
);
