
export type TOffersList = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: TCity;
  location: TLocation;
  isFavorite : boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}

export type TCity = {
  name: string;
  location: TLocation;
}

export type TLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
}
