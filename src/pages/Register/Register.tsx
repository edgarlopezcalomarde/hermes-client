import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiLogIn } from 'react-icons/bi';

import { useTranslation } from 'react-i18next';
import REGISTER from '../../graphql/mutations/REGISTER';
import Input from '../../components/Input/Input';
import Modal from '../../components/Modal/Modal';
import TermsOUse from '../../utils/termOfUse';

function Register() {
  const [, setErrorMessage] = useState('');

  const [register] = useMutation(REGISTER, {
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message);
    },
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      if (!agreeTerms) {
        throw new Error('Accept the terms and conditions');
      }

      if (password !== repeatPassword) {
        throw new Error('Passwords do not match');
      }

      if (username === '' || password === '' || repeatPassword === '') {
        throw new Error('You must fill, all the fields');
      }

      const { data } = await register({
        variables: { username, name: '', password },
      });

      if (data) {
        navigate('/', {
          state: { message: 'The user has been created successfully' },
        });
      }
    } catch (error: unknown) {
      setErrorMessage(error as string);
    }
  };

  return (
    <form
      className="flex h-full w-full justify-center items-center p-4"
      onSubmit={handleRegister}
    >
      <div className="flex flex-col gap-1 mb-6 w-96">
        <h1 className="text-center mb-10 text-6xl font-bold ">Hermes</h1>

        <Input
          id="username"
          label={t('username')}
          onChange={({ target }) => setUsername(target.value)}
          placeholder="pedrito"
          type="text"
          value={username}
          required
        />

        <Input
          id="password"
          label={t('password')}
          onChange={({ target }) => setPassword(target.value)}
          placeholder="•••••••••"
          type="password"
          value={password}
          required
        />

        <Input
          id="confirmpassword"
          label={t('repeatpassword')}
          onChange={({ target }) => setRepeatPassword(target.value)}
          placeholder="•••••••••"
          type="password"
          value={repeatPassword}
          required
        />

        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
          </div>
          <label
            htmlFor="remember"
            className="ml-2 text-sm font-medium text-text-base"
          >
            {t('agree')}{' '}
            <span
              className="text-blue-600 hover:underline dark:text-blue-500"
              onClick={() => setOpen(true)}
              onKeyUp={() => setOpen(true)}
              role="button"
              tabIndex={0}
            >
              {t('terms')}
            </span>
            .
          </label>
        </div>

        <button
          type="submit"
          className="text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
        >
          {t('register')}
        </button>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex justify-center items-center text-sm font-medium mt-4"
        >
          {t('haveaccount')} <BiLogIn className="logInIcon" />
        </button>
      </div>
      <Modal
        title="Terms of Service"
        visible={open}
        onClose={() => setOpen(false)}
      >
        <TermsOUse />
      </Modal>
    </form>
  );
}

export default Register;
