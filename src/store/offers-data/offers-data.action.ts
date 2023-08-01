import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../types/state';
import { APIRoute, CityName} from '../../const';
import { OffersList } from '../../types/offers-list';


export const fetchOffersAction = createAsyncThunk<{data : OffersList[]; city: CityName}, CityName, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (city , { extra: api}): Promise<{data : OffersList[]; city: CityName}> => {
    const {data} = await api.get<OffersList[]>(APIRoute.Offers);
    return {
      data,
      city
    };
  }
);

export const fetchFavAction = createAsyncThunk<OffersList[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavs',
  async (_arg , { extra: api}): Promise< OffersList[]> => {
    const {data} = await api.get<OffersList[]>(APIRoute.Favorite);
    return data;
  }
);
