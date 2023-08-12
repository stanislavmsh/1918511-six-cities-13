import { Link } from 'react-router-dom';
import './not-found-screen.css';

function NotFoundScreen() : JSX.Element {
  return(
    <div className="page page--gray">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <section className="not--found">
        <h1 data-testid="404page">404. Page not found
        </h1>
        <Link to="/">Вернуться на главную</Link>
      </section>
    </div>
  );
}

export default NotFoundScreen;
