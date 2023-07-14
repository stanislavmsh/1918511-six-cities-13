import Review from '../review/review';
import React from 'react';

import { reviews } from '../../mocks/review';

type ReviewsProps = {
  reviewsNumber: number;
}

function Reviews({reviewsNumber}: ReviewsProps): JSX.Element {
  return(
    <React.Fragment>
      <h2 className="reviews__title">
                  Reviews &middot; <span className="reviews__amount">{reviewsNumber}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((elem) => <Review key={elem.id} review={elem}/>)}
      </ul>
    </React.Fragment>
  );

}

export default Reviews;
