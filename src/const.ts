export enum CityName {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export const enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
}

export const enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum SortingOption {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  Top = 'Top rated first'
}

export const enum APIRoute {
  Login = '/login',
  Logout = '/logout',
  Offers = '/offers',
  Favorite = '/favorite',
  Comments = '/comments/',
}

export const enum NameSpace {
  Offers = 'OFFERS',
  User = 'USER',
}

const MARKER_URL = '/img/';
export const URL_MARKER_CURRENT = `${MARKER_URL}pin-active.svg`;
export const URL_MARKER_DEFAULT = `${MARKER_URL}pin.svg`;
export const BACKEND_URL = 'https://13.design.pages.academy/six-cities';

