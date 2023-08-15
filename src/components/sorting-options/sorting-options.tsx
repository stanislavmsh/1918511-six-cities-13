import React, { useState , useCallback, useEffect} from 'react';
import { SortingOption } from '../../const';
import { useDispatch } from 'react-redux';
import { sortOffers } from '../../store/offers-data/offers-data.slice';
import { useAppSelector } from '../../hooks';
import { getSortedBy } from '../../store/offers-data/offers-data.selectors';
import cn from 'classnames';
import styles from './sorting-options.module.css';

function SortingOptions() : JSX.Element {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const dispatch = useDispatch();

  const currentSort = useAppSelector(getSortedBy);

  const handleOpenList = useCallback(() => {
    setIsOpened((opened) => !opened);
  },[]);

  const handleOptionClick = useCallback((optionText : SortingOption) => () => {
    setIsOpened(false);
    dispatch(sortOffers(optionText));
  },[dispatch]);

  const onClickAnywereElse = useCallback((evt: MouseEvent) => {
    if (
      (evt.target as HTMLElement).className !== 'places__option' &&
      (evt.target as HTMLElement).className !== 'places__sorting-type' && isOpened) {
      setIsOpened(false);
    }
  }, [isOpened]);

  useEffect(() => {
    document.addEventListener('click', onClickAnywereElse);
    return () => {
      document.removeEventListener('click' , onClickAnywereElse);
    };
  }, [onClickAnywereElse]);


  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type"
        tabIndex={0}
        onClick={handleOpenList}
      >
        {currentSort}
        <svg className={`places__sorting-arrow ${styles.sorting__arrow}`}>
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={cn('places__options places__options--custom',
          {'places__options--opened' : isOpened}
        )}
      >
        {Object.values(SortingOption).map((elem) => (
          <li
            key={`${elem}=xxxoptionxxx`}
            className={cn('places__option',
              {'places__option--active' : currentSort === elem}
            )}
            tabIndex={0}
            onClick={handleOptionClick(elem)}
          >
            {elem}
          </li>
        ))}
      </ul>
    </form>
  );
}


const MemoizedSortingOptions = React.memo(SortingOptions);

export default MemoizedSortingOptions;
