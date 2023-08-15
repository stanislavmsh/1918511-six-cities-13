import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { Action } from 'redux';
import { APIRoute } from '../../const';
import { TAuthData } from '../../types/auth-data';
import { redirectToRoute } from '../action';
import * as tokenStorage from '../../services/token';
import { loginAction, logoutAction , checkAuthAction } from './user-process.action';
import { extractActionsTypes, AppThunkDispatch } from '../../utils/mocks';
import { fetchFavAction, fetchOffersAction } from '../offers-data/offers-data.action';


describe('User async actions' , () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStore = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({OFFERS: {offers: []}});
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction"', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 200', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "redirectToRoute", "loginAction.fulfilled" , and get pending types of "fetchOffersAction" and "fetchFavAction" when server response 200', async() => {
      const fakeUser: TAuthData = { login: 'test@test.ru', password: '123456' };
      const fakeServerReply = { token: 'secret' , email: 'test@test.ru'};
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReply);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        redirectToRoute.type,
        fetchOffersAction.pending.type,
        fetchFavAction.pending.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveUserInfo" once with the received token', async () => {
      const fakeUser: TAuthData = { login: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret', email: 'test@test.ru' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);

      const mockSaveToken = vi.spyOn(tokenStorage, 'saveUserInfo');

      await store.dispatch(loginAction(fakeUser));
      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token , fakeServerReplay.email);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async() => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });

});
