import React from 'react';

const RatingStarsData = [
  {
    value: '1',
    id: '1-stars',
    title: 'terribly',
  },
  {
    value: '2',
    id: '2-stars',
    title: 'badly',
  },
  {
    value: '3',
    id: '3-stars',
    title: 'not bad',
  },
  {
    value: '4',
    id: '4-stars',
    title: 'good',
  },
  {
    value: '5',
    id: '5-stars',
    title: 'perfect',
  },

];

type TStarsProps = {
  onStarChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  currentRating: number;
  loadingStatus: boolean;
}

function Stars ({onStarChange, currentRating , loadingStatus} : TStarsProps) : JSX.Element {

  const isRatingSelected = (value : string) : boolean => currentRating === Number(value);

  return (
    <div className="reviews__rating-form form__rating">

      {RatingStarsData.map((elem) =>
        (
          <React.Fragment key={`${elem.id}xxxstarxxx`}>
            <input
              onChange={onStarChange}
              className="form__rating-input visually-hidden"
              name="rating"
              value={elem.value}
              id={elem.id}
              type="radio"
              checked={isRatingSelected(elem.value)}
              disabled={loadingStatus}

            />
            <label
              htmlFor={elem.id}
              className="reviews__rating-label form__rating-label"
              title={elem.title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>

          </React.Fragment>)
      ).reverse()}

    </div>
  );

}

export default Stars;
