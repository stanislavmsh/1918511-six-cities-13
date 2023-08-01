import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useAppSelector } from '.';
import { AuthStatus , AppRoute, BACKEND_URL} from '../const';
import { getAuthStatus } from '../store/user-process/user-process.selectors';
import { getToken } from '../services/token';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

type UseFavoriteStatusProps = {
  id: string;
  isFavorite: boolean;
};

type FavResponseData = {
  isFavorite: boolean;
}

const useFavoriteStatus = ({ id, isFavorite }: UseFavoriteStatusProps) => {
  const [favoriteStatus, setFavoriteStatus] = useState<boolean>(isFavorite);

  const isUserAuth = useAppSelector(getAuthStatus) === AuthStatus.Auth;
  const status = favoriteStatus ? 0 : 1;
  const token = getToken();

  const handleFavClick = () => {
    if (!isUserAuth) {
      return <Navigate to={AppRoute.Login} />;
    }

    axios
      .post(`${BACKEND_URL}/favorite/${id}/${status}`, {}, {
        headers: {
          'x-token': token,
        },
      })
      .then((response : AxiosResponse<FavResponseData>) => {
        setFavoriteStatus(response.data.isFavorite);
      })
      .catch(() => {
        toast.warn('Error fav status');
      });
  };

  return { favoriteStatus, handleFavClick };
};

export default useFavoriteStatus;
