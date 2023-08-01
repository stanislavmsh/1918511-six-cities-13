import { useState } from 'react';
import { SortingOption } from '../../const';
import styles from './sorting-options.module.css';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { sortOffers } from '../../store/offers-data/offers-data.slice';

function SortingOptions() : JSX.Element {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [selectedSort, setSelectedSort] = useState<string>('Popular');

  const handleOpenList = () => {
    setIsOpened((opened) => !opened);
  };

  const handleOptionClick = (optionText : string) => {
    setSelectedSort(optionText);
    setIsOpened(false);
  };

  const dispatch = useDispatch();

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type"
        tabIndex={0}
        onClick={handleOpenList}
      >
        {selectedSort}
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
              {'places__option--active' : selectedSort === elem}
            )}
            tabIndex={0}
            onClick={() => {
              handleOptionClick(elem);
              dispatch(sortOffers(elem));
            }}
          >
            {elem}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortingOptions;
