import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, AuthStatus} from '../../const';
import {TUserProcess} from '../../types/state';
import {checkAuthAction, loginAction, logoutAction} from './user-process.action';

const initialState: TUserProcess = {
  authorizationStatus: AuthStatus.Unknown,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthStatus.NoAuth;
      });
  }
});
