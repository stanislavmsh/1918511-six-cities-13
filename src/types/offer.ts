import { TLocation , TCity } from './offers-list';

export type TSingleOffer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: TCity;
  location: TLocation;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: THost;
  images: string[];
  maxAdults: number;

};

export type THost = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}
