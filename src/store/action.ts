import { createAction } from '@reduxjs/toolkit';
// import { OffersList } from '../types/offers-list';

export const getSortedOffers = createAction<{ cityName: string }>('offers/getSortedOffers');

export const cityNameChange = createAction<{ city: string }>('offers/cityNameChange');

export const sortHighToLow = createAction('offers/sortHighToLow');

export const sortLowToHigh = createAction('offers/sortLowToHigh');

export const sortByRating = createAction('offers/sortByRating');

export const resetToDefault = createAction('offers/resetToDefault');
