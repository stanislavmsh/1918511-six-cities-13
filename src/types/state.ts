import { store } from '../store';
import { AuthStatus } from '../const';
import { OffersList } from './offers-list';

export type UserProcess = {
  authorizationStatus: AuthStatus;
}

export type OffersData = {
  cityName: string;
  offers: OffersList[];
  isOffersDataLoading: boolean;
  sortedOffers: OffersList[];
  hasError: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
