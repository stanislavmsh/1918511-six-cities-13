import { Action } from 'redux';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services/api';
import { fetchFavAction, fetchOffersAction } from './offers-data.action';
import { APIRoute } from '../../const';
import { State } from '../../types/state';
import { AppThunkDispatch, extractActionsTypes, makeFakeOffersList } from '../../utils/mocks';


describe('Async actions' , () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStore = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStore>;


  beforeEach(() => {
    store = mockStore({OFFERS: {offers: []}});
  });

  describe('fetchOffersAction' , () => {
    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.fulfilled" when server response 200' , async () => {
      const mockOffers = makeFakeOffersList();
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());

      const emmitedActions = store.getActions();
      const extractedActionTypes = extractActionsTypes(store.getActions());
      const fetchOffersActionFulfulled = emmitedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(extractedActionTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);

      expect(fetchOffersActionFulfulled.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchQuestionAction.pending", "fetchQuestionAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400, []);

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type
      ]);

    });


  });

  describe('fetchFavAction', () => {
    it('should dispatch "fetchFavAction.pending", "fetchFavAction.fulfilled" when server response 200' , async () => {
      const favMockOffers = makeFakeOffersList().filter((elem) =>
        elem.isFavorite === true
      );

      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, favMockOffers);
      await store.dispatch(fetchFavAction());

      const emmitedActions = store.getActions();
      const extractedActionTypes = extractActionsTypes(store.getActions());
      const fetchFavActionFulfulled = emmitedActions.at(1) as ReturnType<typeof fetchFavAction.fulfilled>;

      expect(extractedActionTypes).toEqual([
        fetchFavAction.pending.type,
        fetchFavAction.fulfilled.type,
      ]);

      expect(fetchFavActionFulfulled.payload).toEqual(favMockOffers);
    });

    it('should dispatch "fetchFavAction.pending", "fetchFavAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(400, []);

      await store.dispatch(fetchFavAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavAction.pending.type,
        fetchFavAction.rejected.type
      ]);

    });
  });


});
