import { useState , useEffect , useCallback } from 'react';
import { useAppSelector } from '.';
import { AuthStatus , AppRoute, BACKEND_URL} from '../const';
import { getAuthStatus } from '../store/user-process/user-process.selectors';
import { getToken } from '../services/token';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { formFavStatus, sortOffersByCity } from '../store/offers-data/offers-data.slice';
import axios, { AxiosResponse } from 'axios';
import { getCityName } from '../store/offers-data/offers-data.selectors';

type TUseFavoriteStatusProps = {
  id: string;
  isFavorite: boolean;
  isMainPage?: boolean;
};

type TFavResponseData = {
  isFavorite: boolean;
  id: string;
}

const useFavoriteStatus = ({ id, isFavorite , isMainPage = false }: TUseFavoriteStatusProps) => {
  const [favoriteStatus, setFavoriteStatus] = useState<boolean>(isFavorite);

  const currentCity = useAppSelector(getCityName);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isUserAuth = useAppSelector(getAuthStatus) === AuthStatus.Auth;
  const status = favoriteStatus ? 0 : 1;
  const token = getToken();

  useEffect(() => {
    if (!isUserAuth) {
      setFavoriteStatus(false);
    }
  }, [isUserAuth]);

  const handleFavClick = useCallback(() => {
    if (!isUserAuth) {
      return navigate(AppRoute.Login);
    }


    axios
      .post(`${BACKEND_URL}/favorite/${id}/${status}`, {}, {
        headers: {
          'x-token': token,
        },
      })
      .then((response : AxiosResponse<TFavResponseData>) => {
        setFavoriteStatus(response.data.isFavorite);
        dispatch(formFavStatus({currentId: response.data.id , favStatus: response.data.isFavorite}));
        if (!isMainPage) {
          dispatch(sortOffersByCity(currentCity));
        }
      })
      .catch(() => {
        toast.warn('Error fav status');
      });


  }, [dispatch, id, isUserAuth, navigate, status, token, currentCity , isMainPage]);

  return { favoriteStatus, handleFavClick };
};

export default useFavoriteStatus;
