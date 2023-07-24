import React, { useState, FormEvent } from 'react';
import Stars from '../stars/stars';
import axios from 'axios';
import { BACKEND_URL } from '../../const';
import { useParams } from 'react-router-dom';

import { getToken } from '../../services/token';

type CommentFormProps = {
  comment: string;
  rating: number;
};

function CommentForm(): JSX.Element {
  const [form, setForm] = useState<CommentFormProps>({ rating: 0, comment: '' });
  const onStarChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({
      ...prevState,
      rating: Number(evt.target.value),
    }));
  };
  const textChangeHandler = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ ...form, comment: evt.target.value });
  };

  const parsedId = useParams().id;


  const submitCommentHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log(parsedId, form);
    axios.post(`${BACKEND_URL}/comments/${parsedId || ''}`, form)
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));


  };
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

      <Stars onStarChange={onStarChangeHandler}/>

      <textarea
        onChange={textChangeHandler}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
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
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
