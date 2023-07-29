import { useAppSelector } from '../../hooks';
import { getErrorStatus } from '../../store/offers-data/offers-data.selectors';
import styles from './error-message.module.css';

function ErrorMessage() : JSX.Element | null {
  const error = useAppSelector(getErrorStatus);

  return (error) ? <div className={styles['error-message']}>{error}</div> : null;

}

export default ErrorMessage;
