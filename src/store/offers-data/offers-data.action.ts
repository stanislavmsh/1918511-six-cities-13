import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../types/state';
import { APIRoute } from '../../const';
import { TOffersList } from '../../types/offers-list';


export const fetchOffersAction = createAsyncThunk<TOffersList[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg , { extra: api}): Promise<TOffersList[]> => {
    const {data} = await api.get<TOffersList[]>(APIRoute.Offers);
    return data;
  }
);

export const fetchFavAction = createAsyncThunk<TOffersList[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavs',
  async (_arg , { extra: api}): Promise<TOffersList[]> => {
    const {data} = await api.get<TOffersList[]>(APIRoute.Favorite);
    return data;
  }
);
