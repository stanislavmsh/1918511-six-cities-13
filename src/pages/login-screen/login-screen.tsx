import { Link , Navigate } from 'react-router-dom';
import styles from './login-screen.module.css';
import {FormEvent , useRef} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/user-process/user-process.action';
import { AppRoute, AuthStatus } from '../../const';
import { getAuthStatus } from '../../store/user-process/user-process.selectors';
import { toast } from 'react-toastify';

function LoginScreen(): JSX.Element {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const userLoginStatus = useAppSelector(getAuthStatus);

  if (userLoginStatus === AuthStatus.Auth) {
    return <Navigate to={AppRoute.Root}/>;
  }

  const regexEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
  const regexPassword = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

  const handleSubmit = (evt : FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (usernameRef.current !== null && passwordRef.current !== null) {

      if(!regexEmail.test(usernameRef.current.value) || !regexPassword.test(passwordRef.current.value)) {
        toast.warn('Invalid login form');
        return;
      }

      dispatch(loginAction({
        login: usernameRef.current.value,
        password: passwordRef.current.value,
      })
      );
    }
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img className={`header__logo ${styles.header__logo}`} src="img/logo.svg" alt="6 cities logo"/>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form onSubmit={handleSubmit} className="login__form form" action="" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={usernameRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
