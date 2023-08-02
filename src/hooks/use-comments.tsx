import { useState } from 'react';
import { BACKEND_URL } from '../const';
import { IReview } from '../types/review';
import { toast } from 'react-toastify';
import axios from 'axios';

type CommentFormProps = {
  rating: number;
  comment: string;
};

type useCommentSubmissionProps = {
  parsedId: string;
  token: string;
  setCurrentOfferComments : React.Dispatch<React.SetStateAction<IReview[] | undefined>>;
}


function useCommentSubmission ({parsedId, token, setCurrentOfferComments} : useCommentSubmissionProps) {
  const [form , setForm] = useState<CommentFormProps>({ rating: 0 , comment: ''});

  const onStarChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({
      ...prevState,
      rating: Number(evt.target.value),
    }));
  };

  const textChangeHandler = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ ...form, comment: evt.target.value });
  };

  const submitComment = () => {
    axios.post<IReview>(`${BACKEND_URL}/comments/${parsedId || ''}`, form , {
      headers: {
        'x-token': token
      }
    })
      .then(({data}) => {
        setCurrentOfferComments((oldComments) => {
          if (oldComments) {
            return [...oldComments, data];
          }
          return [data];
        }
        );
        setForm({
          comment: '',
          rating: 0
        });
      }
      )
      .catch(() => {
        toast.warn('comment sending error');
      }
      );


  };

  return { form, onStarChangeHandler, textChangeHandler, submitComment };
}


export default useCommentSubmission;
