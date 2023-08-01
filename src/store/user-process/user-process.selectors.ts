import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { AuthStatus } from '../../const';

export const getAuthStatus = (state: State): AuthStatus => state[NameSpace.User].authorizationStatus;
export const getAuthCheckedStatus = (state: State): boolean => state[NameSpace.User].authorizationStatus !== AuthStatus.Unknown;
