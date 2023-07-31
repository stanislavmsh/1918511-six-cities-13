import { Link} from 'react-router-dom';
import styles from './header.module.css';
import { AppRoute, AuthStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/user-process/user-process.action';
import { getAuthStatus } from '../../store/user-process/user-process.selectors';

function Header(): JSX.Element {
  const userStatus = useAppSelector(getAuthStatus);
  const dispatch = useAppDispatch();

  const isLoggedIn = userStatus === AuthStatus.Auth;

  const handleLogout = () => {
    if(isLoggedIn) {
      dispatch(logoutAction());
    }
  };


  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoute.Root}>
              <img
                className={`header__logo ${styles.header__logo}`}
                src="img/logo.svg"
                alt="6 cities logo"
              />
            </Link>
          </div>
          <nav className="header__nav">

            {isLoggedIn ?
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link onClick={handleLogout} className="header__nav-link" to="/">
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
              :
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              </ul>}

          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
