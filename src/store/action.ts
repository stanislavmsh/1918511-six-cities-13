import { createAction } from '@reduxjs/toolkit';

export const getSortedOffers = createAction<{ cityName: string }>('offers/getSortedOffers');

export const cityNameChange = createAction<{ city: string }>('offers/cityNameChange');


