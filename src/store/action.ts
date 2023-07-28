import { createAction } from '@reduxjs/toolkit';
import { OffersList } from '../types/offers-list';
import { AuthStatus , AppRoute } from '../const';

export const getOffers = createAction<OffersList[]>('data/getOffers');

export const getSortedOffers = createAction<{ cityName: string }>('offers/getSortedOffers');

export const cityNameChange = createAction<{ city: string }>('offers/cityNameChange');

export const sortHighToLow = createAction('offers/sortHighToLow');

export const sortLowToHigh = createAction('offers/sortLowToHigh');

export const sortByRating = createAction('offers/sortByRating');

export const resetToDefault = createAction('offers/resetToDefault');

export const setError = createAction<string | null>('data/error');

export const setLoadingStatus = createAction<boolean>('data/loadingStatus');

export const requireAuth = createAction<AuthStatus>('user/requireAuth');

export const redirectToRoute = createAction<AppRoute>('offers/redirectToRoute');
