/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import CURRENT_USER_LOGGED from '../../graphql/queries/CURRENT_USER_LOGGED';
import UPDATE_USER from '../../graphql/mutations/UPDATE_USER';
import { FormInput } from '../../styledComponents/Input';

function Profile() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<any>('');
  const [avatar, setAvatar] = useState<any>(null);

  const [updateUser, result] = useMutation(UPDATE_USER);
  const { data, loading, error } = useQuery(CURRENT_USER_LOGGED);

  function convertToBase64(file: Blob) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

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
    <form onSubmit={handleSubmit}>
      <label htmlFor="file-upload-3">
        <img src={avatarPreview} alt="" />
      </label>

      <input
        type="file"
        name="myFile"
        id="file-upload-3"
        accept=".jpeg, .png, .jpg"
        onChange={(e) => handleAvatarChange(e)}
      />

      <FormInput
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <FormInput
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button type="submit">Guardar Perfil</button>
    </form>
  );
}

export default Profile;
