import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiLogIn } from 'react-icons/bi';

import CREATE_USER from '../../graphql/mutations/CREATE_USER';
import { Button, Logo, RegisterLayout } from './RegisterStyles';
import {
  FormInput,
  FormLabel,
  FormLayout,
  Href,
} from '../../styledComponents/Input';

function Register() {
  const [, setErrorMessage] = useState('');

  const [createUser] = useMutation(CREATE_USER, {
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message);
    },
  });

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      if (password !== repeatPassword) {
        throw new Error('Las contraseñas no coinciden');
      }

      if (
        username === '' ||
        name === '' ||
        password === '' ||
        repeatPassword === ''
      ) {
        throw new Error('Debes rellar todos los campos');
      }

      const { data } = await createUser({
        variables: { username, name, password },
      });

      if (data) {
        navigate('/', {
          state: { message: 'El usuario a sido creado correctamente' },
        });
      }
    } catch (error: unknown) {
      setErrorMessage(error as string);
    }
  };

  return (
    <RegisterLayout>
      <FormLayout onSubmit={handleRegister}>
        <Logo>Hermes</Logo>

        <div>
          <FormLabel>Username: </FormLabel>
          <FormInput
            required
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          <FormLabel>Name: </FormLabel>
          <FormInput
            required
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>

        <div>
          <FormLabel>Password: </FormLabel>
          <FormInput
            required
            type="text"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <div>
          <FormLabel>RepeatPassword: </FormLabel>
          <FormInput
            required
            type="text"
            value={repeatPassword}
            onChange={({ target }) => setRepeatPassword(target.value)}
          />
        </div>

        <Button type="submit">Sign In</Button>
      </FormLayout>

      <Href onClick={() => navigate('/')}>
        I already have an account <BiLogIn className="logInIcon" />
      </Href>
    </RegisterLayout>
  );
}

export default Register;
