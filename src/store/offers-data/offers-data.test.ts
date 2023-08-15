import { SortingOption } from '../../const';
import { cityNameChange, formFavStatus, offersData , sortOffers, sortOffersByCity } from './offers-data.slice';
import { makeFakeOffersList } from '../../utils/mocks';
import { fetchFavAction, fetchOffersAction } from './offers-data.action';

const initialState = {
  cityName: 'Paris',
  offers: [],
  isOffersDataLoading: false,
  sortedOffers: [],
  hasError: false,
  favorites: [],
  sortedBy: SortingOption.Popular,
};
const offersMock = makeFakeOffersList();


describe('offersData reducers', () => {


  it('should return initial state with empty action' , () => {
    const emptyAction = { type: ''};
    const state = {...initialState};

    const expectedState = offersData.reducer(state , emptyAction);
    expect(state).toEqual(expectedState);
  });

  it('should return default initial state with empty action' , () => {
    const emptyAction = { type: ''};
    const state = {...initialState};

    const expectedState = offersData.reducer(undefined , emptyAction);
    expect(state).toEqual(expectedState);
  });


  it('should return an array only with one city name to state', () => {
    const state = {...initialState , offers: [...offersMock]};
    const actionPayload = 'Amsterdam';
    const newState = offersData.reducer(state , sortOffersByCity(actionPayload));

    const expectedState = [...offersMock].filter((elem) => elem.city.name === actionPayload);

    expect(newState.sortedOffers).toEqual(expectedState);
  });

  it('should change cityName in state', () => {
    const actionPayload = 'Amsterdam';
    const newState = offersData.reducer(initialState , cityNameChange(actionPayload));

    expect(newState.cityName).toBe('Amsterdam');

  });

  it('should sort offers by the selected sorting option', () => {
    const state = {...initialState, sortedOffers: [...offersMock]};
    const actionPayload = SortingOption.HighToLow;
    const newState = offersData.reducer(state, sortOffers(actionPayload));

    const expectedState = [...offersMock].sort((a, b) => b.price - a.price);

    expect(newState.sortedOffers).toEqual(expectedState);
    expect(newState.sortedBy).toBe(SortingOption.HighToLow);

  });

  it('should update favourite status and fill favourites in state with only positive status', () => {
    const state = {...initialState, offers: [...offersMock], sortedOffers: [...offersMock]};
    const actionPayload = {currentId: '1' , favStatus: true};
    const newState = offersData.reducer(state, formFavStatus(actionPayload));

    const expectedStateFavorites = [...offersMock].filter((elem) =>
      elem.isFavorite === true
    );
    const expectedOffers = [...offersMock].map((elem) => {
      if (elem.id === actionPayload.currentId) {
        return {...elem, isFavorite: actionPayload.favStatus};
      }
      return elem;
    });

    expect(newState.favorites).toEqual(expectedStateFavorites);
    expect(newState.offers).toEqual(expectedOffers);

  });

});

describe('ofersData extraReducers' , () => {

  it('should set "isOffersDataLoading" to true , "hasError" to false with fetchOffersAction.pending' , () => {
    const expectedState = {...initialState, isOffersDataLoading: true};

    const newState = offersData.reducer(undefined, fetchOffersAction.pending);

    expect(newState).toEqual(expectedState);
  });

  it('should set "isOffersDataLoading" to false , "hasError" to true with fetchOffersAction.rejected' , () => {
    const expectedState = {...initialState, hasError: true};

    const newState = offersData.reducer(undefined, fetchOffersAction.rejected);

    expect(newState).toEqual(expectedState);
  });

  it('should set offers, sort offers by city name and filter favourite offers from data, isOffersDataLoading to false with fetchOffersAction.rejected', () => {
    const mockFavorites = [...offersMock].filter((elem) =>
      elem.isFavorite === true
    );
    const mockSortedOFfers = [...offersMock].filter((elem) => elem.city.name === initialState.cityName);
    const expectedState = {...initialState, offers: [...offersMock], favorites: mockFavorites , sortedOffers: mockSortedOFfers};

    const newState = offersData.reducer(undefined, fetchOffersAction.fulfilled(offersMock, '', undefined));

    expect(newState).toEqual(expectedState);

  });

  it('should set favorites array from data with fetchFavAction.fullfilled', () => {
    const mockFavorites = [...offersMock].filter((elem) =>
      elem.isFavorite === true
    );

    const expectedState = {...initialState, favorites: mockFavorites};

    const newState = offersData.reducer(undefined, fetchFavAction.fulfilled(mockFavorites, '', undefined));

    expect(newState).toEqual(expectedState);

  });

  it('should set favoites to default with fetchFavAction.rejected', () => {
    const expectedState = {...initialState, hasError: true};

    const newState = offersData.reducer(undefined, fetchFavAction.rejected);

    expect(newState).toEqual(expectedState);

  });

});
