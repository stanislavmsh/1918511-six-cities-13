import { Link , Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, AuthStatus } from '../../const';
import { getAuthStatus } from '../../store/user-process/user-process.selectors';
import { cityNameChange, sortOffersByCity } from '../../store/offers-data/offers-data.slice';
import { CityName } from '../../const';
import LoginForm from '../../components/login-form/login-form';
import styles from './login-screen.module.css';

function LoginScreen(): JSX.Element {

  const arrayOfCityNames = Object.values(CityName);
  const randomCityName = arrayOfCityNames[(Math.floor(Math.random() * arrayOfCityNames.length))];

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userLoginStatus = useAppSelector(getAuthStatus);

  if (userLoginStatus === AuthStatus.Auth) {
    return <Navigate to={AppRoute.Root}/>;
  }

  const handleCityNameClick = () => {
    dispatch(cityNameChange(randomCityName));
    dispatch(sortOffersByCity(randomCityName));
    navigate(AppRoute.Root);
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
            <LoginForm />
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a
                className="locations__item-link"
                href="#"
                onClick={handleCityNameClick}
              >
                <span>{randomCityName}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
