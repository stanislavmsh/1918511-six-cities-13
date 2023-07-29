import { createAction } from '@reduxjs/toolkit';
// import { OffersList } from '../types/offers-list';
import { AppRoute } from '../const';


export const redirectToRoute = createAction<AppRoute>('offers/redirectToRoute');
