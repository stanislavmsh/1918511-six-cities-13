import styles from './loading-screen.module.css';

function LoadingScreen(): JSX.Element {
  return (
    <img className={styles.loading} src="https://dbdzm869oupei.cloudfront.net/img/sticker/preview/29888.png" alt='Loading icon' />
  );
}

export default LoadingScreen;
