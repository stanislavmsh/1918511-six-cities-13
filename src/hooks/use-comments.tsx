import { useState } from 'react';
import { BACKEND_URL } from '../const';
import { TReview } from '../types/review';
import { toast } from 'react-toastify';
import axios from 'axios';

type TCommentFormProps = {
  rating: number;
  comment: string;
};

type TUseCommentSubmissionProps = {
  parsedId: string;
  token: string;
  setCurrentOfferComments : React.Dispatch<React.SetStateAction<TReview[] | undefined>>;
}


function useCommentSubmission ({parsedId, token, setCurrentOfferComments} : TUseCommentSubmissionProps) {
  const [form , setForm] = useState<TCommentFormProps>({ rating: 0 , comment: ''});

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
    axios.post<TReview>(`${BACKEND_URL}/comments/${parsedId || ''}`, form , {
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
