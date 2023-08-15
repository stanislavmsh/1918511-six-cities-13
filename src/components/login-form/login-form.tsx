import {FormEvent , useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/user-process/user-process.action';

type TInputValues = {
  login: string;
  password: string;
}


function LoginForm (): JSX.Element {

  const dispatch = useAppDispatch();

  const [inputValues , setInputValues] = useState<TInputValues>({
    login: '',
    password: '',
  });

  const regexEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
  const regexPassword = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

  const handleInputsChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.type === 'email') {
      setInputValues({ ...inputValues, login: evt.target.value });
    } else {
      setInputValues({ ...inputValues, password: evt.target.value });
    }
  };

  const handleSubmit = (evt : FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if(!regexEmail.test(inputValues.login)) {
      toast.warn('Incorrect email');
      return;
    }

    if(!regexPassword.test(inputValues.password)) {
      toast.warn('Incorrect password');
      return;
    }

    dispatch(loginAction(inputValues));
  };


  return(
    <form onSubmit={handleSubmit} className="login__form form" action="" method="post">
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          value={inputValues.login}
          onChange={handleInputsChange}
          required
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          value={inputValues.password}
          onChange={handleInputsChange}
          required
        />
      </div>
      <button
        className="login__submit form__submit button"
        type="submit"
      >Sign in
      </button>
    </form>
  );
}

export default LoginForm;
