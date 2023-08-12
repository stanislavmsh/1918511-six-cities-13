import { AuthStatus } from '../../const';
import { checkAuthAction, loginAction, logoutAction } from './user-process.action';

import { userProcess } from './user-process.slice';

describe('UserProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { authorizationStatus: AuthStatus.Auth };

    const newState = userProcess.reducer(expectedState, emptyAction);

    expect(newState).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { authorizationStatus: AuthStatus.Unknown };

    const newState = userProcess.reducer(undefined, emptyAction);

    expect(newState).toEqual(expectedState);
  });

  it('should set "Auth" with "checkAuthAction.fulfilled" action', () => {
    const initialState = { authorizationStatus: AuthStatus.NoAuth };
    const expectedState = { authorizationStatus: AuthStatus.Auth };

    const newState = userProcess.reducer(initialState, checkAuthAction.fulfilled);

    expect(newState).toEqual(expectedState);
  });

  it('should set "NoAuth" with "checkAuthAction.rejected" action', () => {
    const initialState = { authorizationStatus: AuthStatus.Auth };
    const expectedState = { authorizationStatus: AuthStatus.NoAuth };

    const newState = userProcess.reducer(initialState, checkAuthAction.rejected);

    expect(newState).toEqual(expectedState);
  });

  it('should set "Auth" with "loginAction.fulfilled" action', () => {
    const initialState = { authorizationStatus: AuthStatus.NoAuth };
    const expectedState = { authorizationStatus: AuthStatus.Auth };

    const newState = userProcess.reducer(initialState, loginAction.fulfilled);

    expect(newState).toEqual(expectedState);
  });

  it('should set "NoAuth" with "loginAction.rejected" action', () => {
    const initialState = { authorizationStatus: AuthStatus.Auth };
    const expectedState = { authorizationStatus: AuthStatus.NoAuth };

    const newState = userProcess.reducer(initialState, loginAction.rejected);

    expect(newState).toEqual(expectedState);
  });

  it('should set "NoAuth", with "logoutAction.fulfilled" action', () => {
    const initialState = { authorizationStatus: AuthStatus.Auth };
    const expectedState = { authorizationStatus: AuthStatus.NoAuth };

    const newState = userProcess.reducer(initialState, logoutAction.fulfilled);

    expect(newState).toEqual(expectedState);
  });
});
