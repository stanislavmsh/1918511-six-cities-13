const AUTH_TOKEN_KEY_NAME = 'six-cities-token';
const USER_EMAIL = 'user-email';


export type Token = string;

export const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
};

export const getUsername = (): string => {
  const email = localStorage.getItem(USER_EMAIL);
  return email ?? '';
};

export const saveUserInfo = (token: Token, email : string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
  localStorage.setItem(USER_EMAIL, email);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};
