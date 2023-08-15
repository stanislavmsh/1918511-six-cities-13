import { NameSpace, SortingOption } from '../../const';
import { State } from '../../types/state';
import { TOffersList } from '../../types/offers-list';

export const getOffers = (state: State): TOffersList[] => state[NameSpace.Offers].offers;
export const getCityName = (state: State): string => state[NameSpace.Offers].cityName;
export const getSortedOffers = (state: State): TOffersList[] => state[NameSpace.Offers].sortedOffers;
export const getLoadingStatus = (state: State): boolean => state[NameSpace.Offers].isOffersDataLoading;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Offers].hasError;
export const getFavorites = (state: State): TOffersList[] => state[NameSpace.Offers].favorites;
export const getSortedBy = (state: State): SortingOption => state[NameSpace.Offers].sortedBy;
