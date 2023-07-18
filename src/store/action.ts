import { createAction } from '@reduxjs/toolkit';
// import { OffersList } from '../types/offers-list';

// export const incrementStep = createAction('incrementStep');

export const getOffers = createAction<{ cityName: string}>('offers/getOffers');

export const cityNameChange = createAction<{city: string}>('offers/cityNameChange');

export const getCurrentStateOffers = createAction('offers/currentOffers');

