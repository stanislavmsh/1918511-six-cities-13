import React from 'react';
import Stars from '../stars/stars';
import { useParams } from 'react-router-dom';
import { getToken } from '../../services/token';
import { TReview } from '../../types/review';

import useCommentSubmission from '../../hooks/use-comments';

type TCommentFormProps = {
  setCurrentOfferComments : React.Dispatch<React.SetStateAction<TReview[] | undefined>>;
}

function CommentForm({ setCurrentOfferComments } : TCommentFormProps): JSX.Element {
  const parsedId = useParams().id || '';
  const token = getToken();

  const {form , onStarChangeHandler , textChangeHandler , submitCommentHandler , isLoading} = useCommentSubmission({parsedId , token , setCurrentOfferComments});
  const isCommentSubmitAvailable = form.comment.length > 50 && form.rating !== 0 && !isLoading;

  return (
    <form
      onSubmit={submitCommentHandler}
      className="reviews__form form"
      action="#"
      method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <Stars loadingStatus={isLoading} onStarChange={onStarChangeHandler} currentRating={form.rating}/>

      <textarea
        maxLength={300}
        onChange={textChangeHandler}
        value={form.comment}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        disabled={isLoading}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled = {!isCommentSubmitAvailable}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
