import { Action } from 'redux';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services/api';
import { fetchFavAction, fetchOffersAction } from './offers-data.action';
import { APIRoute } from '../../const';
import { State } from '../../types/state';
import { AppThunkDispatch, extractActionsTypes, makeFakeOffersList } from '../../utils/mocks';
import { TAuthData } from '../../types/auth-data';
import { redirectToRoute } from '../action';
import * as tokenStorage from '../../services/token';
import { loginAction } from '../user-process/user-process.action';


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


});

// const fakeUser: TAuthData = {login: 'test@test.ru', password: '123456'};
//       const fakeServerReplay = { token: 'secret' };
//       mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);

//       await store.dispatch(loginAction(fakeUser));
//       const actions = extractActionsTypes(store.getActions());

//       expect(actions).toEqual([
//         loginAction.pending.type,
//         redirectToRoute.type,
//         loginAction.fulfilled.type,
//       ]);c
