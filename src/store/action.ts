import { createAction } from '@reduxjs/toolkit';
// import { OffersList } from '../types/offers-list';
import { AppRoute } from '../const';

export const setError = createAction<string | null>('data/error');

export const redirectToRoute = createAction<AppRoute>('offers/redirectToRoute');
