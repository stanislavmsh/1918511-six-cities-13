import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { OffersList } from '../../types/offers-list';

export const getOffers = (state: State): OffersList[] => state[NameSpace.Offers].offers;
export const getOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.Offers].isOffersDataLoading;
export const getCityName = (state: State): string => state[NameSpace.Offers].cityName;
export const getSortedOffers = (state: State): OffersList[] => state[NameSpace.Offers].sortedOffers;
export const getLoadingStatus = (state: State): boolean => state[NameSpace.Offers].isOffersDataLoading;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Offers].hasError;
