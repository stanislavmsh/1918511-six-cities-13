import { TOffersList } from '../../types/offers-list';


export const offersMock: TOffersList[] = [
  {
    'id': '1',
    'title': 'Amazing and Extremely Central Flat',
    'type': 'room',
    'price': 118,
    'previewImage': 'https://13.design.pages.academy/static/hotel/2.jpg',
    'city': {
      'name': 'Amsterdam',
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
    'isFavorite': false,
    'isPremium': true,
    'rating': 4.2
  },

  {
    'id': '2',
    'title': 'Waterfront with extraordinary view',
    'type': 'house',
    'price': 349,
    'previewImage': 'https://13.design.pages.academy/static/hotel/6.jpg',
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.3609553943508,
        'longitude': 4.85309666406198,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 52.3609553943508,
      'longitude': 4.85309666406198,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 2
  },

  {
    'id': '3',
    'title': 'Waterfront with extraordinary view',
    'type': 'house',
    'price': 956,
    'previewImage': 'https://13.design.pages.academy/static/hotel/9.jpg',
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 52.3909553943508,
        'longitude': 4.929309666406198,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 52.3909553943508,
      'longitude': 4.929309666406198,
      'zoom': 16
    },
    'isFavorite': true,
    'isPremium': false,
    'rating': 4.6
  },

  {
    'id': '4',
    'title': 'Canal View Prinsengracht',
    'type': 'room',
    'price': 223,
    'previewImage': 'https://13.design.pages.academy/static/hotel/4.jpg',
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 52.3809553943508,
        'longitude': 4.939309666406198,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 52.3809553943508,
      'longitude': 4.939309666406198,
      'zoom': 16
    },
    'isFavorite': true,
    'isPremium': true,
    'rating': 4.1
  }];
