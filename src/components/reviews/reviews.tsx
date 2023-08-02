import Review from '../review/review';
import React from 'react';
import { IReview } from '../../types/review';

type ReviewsProps = {
  comments: IReview[];
}

function Reviews({ comments }: ReviewsProps): JSX.Element {
  const sortedCommentsByDate = comments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const limitedComments = sortedCommentsByDate.slice(0, 10);

  return(
    <React.Fragment>
      <h2 className="reviews__title">
                  Reviews &middot; <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ul className="reviews__list">
        {limitedComments.map((elem) => <Review key={elem.id} review={elem}/>)}
      </ul>
    </React.Fragment>
  );

}

export default Reviews;
