export const enum Setting {
  OffersCount = 212,
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

const MARKER_URL = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/';

export const URL_MARKER_DEFAULT = `${MARKER_URL}pin.svg`;

export const URL_MARKER_CURRENT = `${MARKER_URL}main-pin.svg`;
