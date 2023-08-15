import { store } from '../store';
import { AuthStatus , SortingOption } from '../const';
import { TOffersList } from './offers-list';

export type TUserProcess = {
  authorizationStatus: AuthStatus;
}

export type TOffersData = {
  cityName: string;
  offers: TOffersList[];
  isOffersDataLoading: boolean;
  sortedOffers: TOffersList[];
  hasError: boolean;
  favorites: TOffersList[];
  sortedBy: SortingOption;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
