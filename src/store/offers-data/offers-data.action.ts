import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../types/state';
import { APIRoute, CityName} from '../../const';
import { OffersList } from '../../types/offers-list';
// import { sortOffersByCity , getOffersToState } from './offers-data/offers-data.slice';
import { TIMEOUT_SHOW_ERROR } from '../../const';
import { setError } from '../action';
import { store } from '..';

export const fetchOffersAction = createAsyncThunk<{data : OffersList[]; city: CityName}, CityName, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (city , { extra: api}): Promise<{data : OffersList[]; city: CityName}> => {
    const {data} = await api.get<OffersList[]>(APIRoute.Offers);
    // dispatch(getOffersToState(data));
    // dispatch(sortOffersByCity(city));
    return {
      data,
      city
    };
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
