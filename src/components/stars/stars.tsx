import React from 'react';
const AMOUNT = [1, 2, 3, 4, 5];

type StarsProps = {
  handler: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

function Stars ({handler} : StarsProps) : JSX.Element {
  return (
    <div className="reviews__rating-form form__rating">

      {AMOUNT.map((elem) =>
        (
          <React.Fragment key={elem}>
            <input
              onChange={handler}
              className="form__rating-input visually-hidden"
              name="rating"
              value={`${elem}`}
              id={`${elem}-stars`}
              type="radio"
            />
            <label
              htmlFor={`${elem}-stars`}
              className="reviews__rating-label form__rating-label"
              title="badly"
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>

          </React.Fragment>)
      )}

    </div>
  );

}

export default Stars;
