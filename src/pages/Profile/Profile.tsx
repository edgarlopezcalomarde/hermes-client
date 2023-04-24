/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';

import { useNavigate } from 'react-router-dom';
import CURRENT_USER_LOGGED from '../../graphql/queries/CURRENT_USER_LOGGED';
import UPDATE_USER from '../../graphql/mutations/UPDATE_USER';
import { FormInput, FormLabel, FormLayout } from '../../styledComponents/Input';
import { convertToBase64 } from '../../utils/helpers';
import { BackButtonBox, ProfileLayout } from './ProfileStyles';
import { Button } from '../Login/LoginStyles';
import ToggleButton from '../../components/ToggleButton/ToggleButton';

function Profile() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<any>('');
  const [avatar, setAvatar] = useState<any>(null);

  const [updateUser] = useMutation(UPDATE_USER);
  const { data, loading, error } = useQuery(CURRENT_USER_LOGGED);

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setId(data.getCurrentUser.id);
      setName(data.getCurrentUser.name);
      setUsername(data.getCurrentUser.username);
      setAvatarPreview(data.getCurrentUser.avatarImg);
    }
  }, [data]);

  const handleAvatarChange = async (e: any) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setAvatarPreview(base64);
    setAvatar(base64);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    updateUser({
      variables: {
        id,
        name,
        username,
        avatar,
      },
    });
  };

  if (loading) return <div>loading......</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  return (
    <ProfileLayout>
      <div className="switchMode">
        <ToggleButton />
      </div>

      <BackButtonBox>
        <MdOutlineKeyboardBackspace onClick={() => navigate('/chatlist')} />
      </BackButtonBox>

      <FormLayout onSubmit={handleSubmit}>
        <label htmlFor="file-upload-3">
          <img src={avatarPreview} alt="" />
        </label>

        <input
          type="file"
          name="myFile"
          id="file-upload-3"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => handleAvatarChange(e)}
          hidden
        />

        <div>
          <FormLabel> Username: </FormLabel>
          <FormInput
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <FormLabel> Name: </FormLabel>

          <FormInput
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <Button type="submit">Guardar Perfil</Button>
      </FormLayout>
    </ProfileLayout>
  );
}

export default Profile;
