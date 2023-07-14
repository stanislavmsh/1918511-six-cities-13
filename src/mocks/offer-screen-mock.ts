import { SingleOffer } from '../types/offer';
import { offers } from './offers';

export const offerScreenMock: SingleOffer[] = [
  {
    'id': offers[0].id,
    'title': offers[0].title,
    'description': 'Design interior in most sympathetic area! Complitely renovated, well-equipped, cosy studio in idyllic, over 100 years old wooden house. Calm street, fast connection to center and airport.',
    'type': offers[0].type,
    'price': offers[0].price,
    'images': [
      'https://13.design.pages.academy/static/hotel/2.jpg',
      'https://13.design.pages.academy/static/hotel/6.jpg',
      'https://13.design.pages.academy/static/hotel/17.jpg',
      'https://13.design.pages.academy/static/hotel/7.jpg',
      'https://13.design.pages.academy/static/hotel/11.jpg',
      'https://13.design.pages.academy/static/hotel/9.jpg'
    ],
    'city': offers[0].city,
    'location': offers[0].location,
    'goods': [
      'Heating',
      'Towels',
      'Fridge',
      'Washer',
      'Washing machine',
      'Air conditioning',
      'Breakfast',
      'Laptop friendly workspace'
    ],
    'host': {
      'isPro': true,
      'name': 'Angelina',
      'avatarUrl': 'https://13.design.pages.academy/static/host/avatar-angelina.jpg'
    },
    'isPremium': offers[0].isPremium,
    'isFavorite': offers[0].isFavorite,
    'rating': offers[0].rating,
    'bedrooms': 1,
    'maxAdults': 5
  },
  {
    'id': offers[1].id,
    'title': offers[1].title,
    'description': 'This is a place for dreamers to reset, reflect, and create. Designed with a \'slow\' pace in mind, our hope is that you enjoy every part of your stay; from making local coffee by drip in the morning, choosing the perfect record to put on as the sun sets.',
    'type': offers[1].type,
    'price': offers[1].price,
    'images': [
      'https://13.design.pages.academy/static/hotel/13.jpg',
      'https://13.design.pages.academy/static/hotel/4.jpg',
      'https://13.design.pages.academy/static/hotel/15.jpg',
      'https://13.design.pages.academy/static/hotel/19.jpg',
      'https://13.design.pages.academy/static/hotel/10.jpg',
      'https://13.design.pages.academy/static/hotel/9.jpg'
    ],
    'city': offers[1].city,
    'location': offers[1].location,
    'goods': [
      'Towels',
      'Air conditioning',
      'Dishwasher',
      'Baby seat'
    ],
    'host': {
      'isPro': true,
      'name': 'Angelina',
      'avatarUrl': 'https://13.design.pages.academy/static/host/avatar-angelina.jpg'
    },
    'isPremium': offers[1].isPremium,
    'isFavorite': offers[1].isFavorite,
    'rating': offers[1].rating,
    'bedrooms': 2,
    'maxAdults': 1
  },
  {
    'id': offers[2].id,
    'title': offers[2].title,
    'description': 'Design interior in most sympathetic area! Complitely renovated, well-equipped, cosy studio in idyllic, over 100 years old wooden house. Calm street, fast connection to center and airport.',
    'type': offers[2].type,
    'price': offers[2].price,
    'images': [
      'https://13.design.pages.academy/static/hotel/6.jpg',
      'https://13.design.pages.academy/static/hotel/5.jpg',
      'https://13.design.pages.academy/static/hotel/19.jpg',
      'https://13.design.pages.academy/static/hotel/13.jpg',
      'https://13.design.pages.academy/static/hotel/14.jpg',
      'https://13.design.pages.academy/static/hotel/20.jpg'
    ],
    'city': offers[2].city,
    'location': offers[2].location,
    'goods': [
      'Breakfast',
      'Towels',
      'Heating',
      'Kitchen',
      'Baby seat',
      'Washing machine'
    ],
    'host': {
      'isPro': true,
      'name': 'Angelina',
      'avatarUrl': 'https://13.design.pages.academy/static/host/avatar-angelina.jpg'
    },
    'isPremium': offers[2].isPremium,
    'isFavorite': offers[2].isFavorite,
    'rating': offers[2].rating,
    'bedrooms': 1,
    'maxAdults': 2
  },
  {
    'id': offers[3].id,
    'title': offers[3].title,
    'description': 'A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.',
    'type': offers[3].type,
    'price': offers[3].price,
    'images': [
      'https://13.design.pages.academy/static/hotel/14.jpg',
      'https://13.design.pages.academy/static/hotel/12.jpg',
      'https://13.design.pages.academy/static/hotel/16.jpg',
      'https://13.design.pages.academy/static/hotel/11.jpg',
      'https://13.design.pages.academy/static/hotel/18.jpg',
      'https://13.design.pages.academy/static/hotel/7.jpg'
    ],
    'city': offers[3].city,
    'location': offers[3].location,
    'goods': [
      'Washer',
      'Baby seat',
      'Laptop friendly workspace',
      'Breakfast',
      'Washing machine',
      'Dishwasher',
      'Kitchen',
      'Cable TV',
      'Heating'
    ],
    'host': {
      'isPro': true,
      'name': 'Angelina',
      'avatarUrl': 'https://13.design.pages.academy/static/host/avatar-angelina.jpg'
    },
    'isPremium': offers[3].isPremium,
    'isFavorite': offers[3].isFavorite,
    'rating': offers[3].rating,
    'bedrooms': 4,
    'maxAdults': 7
  }

];
