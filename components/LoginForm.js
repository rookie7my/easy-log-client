import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

import FormMessage from "./FormMessage";
import Modal from './Modal';
import useValidatedFormFields, {FORM_FIELD_ERROR_TYPE} from '../hooks/useValidatedFormFields';

const errorMessages = {
  email: {
    [FORM_FIELD_ERROR_TYPE.VALUE_MISSING]: '이메일을 입력해주세요'
  },
  password: {
    [FORM_FIELD_ERROR_TYPE.VALUE_MISSING]: '비밀번호를 입력해주세요'
  }
};

const LoginForm = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const loginMutation = useMutation(({ email, password }) => {
    return axios.post('/api/users/login', { email, password });
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('currentUser');
      router.push('/');
    }
  });

  const { fieldValues, onFieldValueChanged, onFormSubmitted, getFieldError } = useValidatedFormFields({
    email: '',
    password: '',
  }, errorMessages);

  const [errorMessageOnModal, setErrorMessageOnModal] = useState('');

  const onModalCloseButtonClicked = useCallback(() => {
    setErrorMessageOnModal('');
  }, []);

  const onLoginFormSubmitted = onFormSubmitted(
    fieldValues => {
      loginMutation.mutate(fieldValues);
    },
    ({ fieldError }) => {
      setErrorMessageOnModal(fieldError[0].errorMessage);
    }
  );

  const fieldError = {
    email: getFieldError('email'),
    password: getFieldError('password')
  };

  return (
    <section className="w-80 mx-auto">
      <header className="text-center mt-4 mb-8 space-y-4">
        <Link href="/">
          <a className="text-gray-500 text-sm">Easy Log</a>
        </Link>
        <h2 className="text-3xl">로그인</h2>
      </header>
      <form noValidate onSubmit={onLoginFormSubmitted} className="space-y-6">
        <div className="flex flex-col space-y-1">
          <label htmlFor="email">이메일</label>
          <input id="email" type="text" name="email"
                 required
                 value={fieldValues.email} onChange={onFieldValueChanged}
                 className="form-input"
          />
          {fieldError.email.length > 0 &&
            <FormMessage isActive>
              {fieldError.email[0].errorMessage}
            </FormMessage>
          }
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="password">비밀번호</label>
          <input id="password" type="password" name="password"
                 required
                 value={fieldValues.password} onChange={onFieldValueChanged}
                 className="form-input"
          />
          {fieldError.password.length > 0 &&
            <FormMessage isActive>
              {fieldError.password[0].errorMessage}
            </FormMessage>
          }
        </div>
        <button
          type="submit"
          className="bg-blue-500 rounded p-2 text-white w-full"
        >
          로그인
        </button>
        <div className="text-center text-sm space-x-2">
          <span>아직 계정이 없으신가요?</span>
          <Link href="/signup">
            <a className="text-gray-500">계정 만들기</a>
          </Link>
        </div>
      </form>
      {errorMessageOnModal &&
        <Modal title="로그인 실패"
               onModalCloseButtonClicked={onModalCloseButtonClicked}
        >
          <p>{errorMessageOnModal}</p>
        </Modal>
      }
    </section>
  );
};

export default LoginForm;
