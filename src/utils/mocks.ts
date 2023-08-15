import {system , datatype, lorem} from 'faker';
import { TOffersList } from '../types/offers-list';
import { CityName } from '../const';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../services/api';
import { State } from '../types/state';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>

const citiesNames = Object.values(CityName);


export const makeFakeOffersList = (): TOffersList[] => (
  new Array(8).fill(null).map(() => ({
    'id': datatype.uuid(),
    'title': lorem.text(),
    'type': 'room',
    'price': Math.floor(Math.random() * 100),
    'previewImage': system.filePath(),
    'city': {
      'name': citiesNames[(Math.floor(Math.random() * citiesNames.length))],
      'location': {
        'latitude': 52.3909553943508,
        'longitude': 4.85309666406198,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 52.3909553943508,
      'longitude': 4.85309666406198,
      'zoom': 16
    },
    'isFavorite': datatype.boolean(),
    'isPremium': datatype.boolean(),
    'rating': 4.2
  })
  ));

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
