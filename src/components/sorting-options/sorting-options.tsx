import { useState } from 'react';
import { SortingOption } from '../../const';
import styles from './sorting-options.module.css';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { resetToDefault, sortByRating, sortHighToLow, sortLowToHigh } from '../../store/action';

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

  const handleSortHighToLow = () => {
    handleOptionClick(SortingOption.HighToLow);
    dispatch(sortHighToLow());
  };

  const handleSortLowToHigh = () => {
    handleOptionClick(SortingOption.LowToHigh);
    dispatch(sortLowToHigh());
  };

  const resetDefault = () => {
    handleOptionClick(SortingOption.Popular);
    dispatch(resetToDefault());
  };

  const handleDortByRating = () => {
    handleOptionClick(SortingOption.Top);
    dispatch(sortByRating());
  };

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
        <li
          className={cn('places__option',
            {'places__option--active' : selectedSort === SortingOption.Popular}
          )}
          tabIndex={0}
          onClick={resetDefault}
        >
          {SortingOption.Popular}
        </li>
        <li className={cn('places__option',
          {'places__option--active' : selectedSort === SortingOption.LowToHigh}
        )}
        tabIndex={0}
        onClick={handleSortLowToHigh }
        >
          {SortingOption.LowToHigh}
        </li>
        <li className={cn('places__option',
          {'places__option--active' : selectedSort === SortingOption.HighToLow}
        )}
        tabIndex={0}
        onClick={handleSortHighToLow}
        >
          {SortingOption.HighToLow}
        </li>
        <li className={cn('places__option',
          {'places__option--active' : selectedSort === SortingOption.Top}
        )}
        tabIndex={0}
        onClick={handleDortByRating}
        >
          {SortingOption.Top}
        </li>
      </ul>
    </form>
  );
}

export default SortingOptions;
