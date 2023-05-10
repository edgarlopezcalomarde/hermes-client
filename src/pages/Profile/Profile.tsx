/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CURRENT_USER_LOGGED from '../../graphql/queries/CURRENT_USER_LOGGED';
import UPDATE_USER from '../../graphql/mutations/UPDATE_USER';
import { convertToBase64 } from '../../utils/helpers';
import Input from '../../components/Input/Input';

import defaultProfile from '../../assets/profileNotFound.jpg';
import { LanguageSelector } from '../../components/LanguageSelector';

function Profile() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<any>('');
  const [avatar, setAvatar] = useState<any>(null);

  const [updateUser] = useMutation(UPDATE_USER);
  const { data, loading, error } = useQuery(CURRENT_USER_LOGGED);

  const navigate = useNavigate();
  const { t } = useTranslation();

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

  if (loading) return <div>{t('loading')}</div>;
  if (error)
    return (
      <div>
        {t('error')}
        {error.message}
      </div>
    );

  return (
    <form
      className="flex h-full w-full justify-center items-center"
      onSubmit={handleSubmit}
    >
      <div className="absolute top-10 right-10 ">
        <LanguageSelector />
      </div>

      <div className="absolute top-6 left-6 text-5xl">
        <MdOutlineKeyboardBackspace onClick={() => navigate('/chatlist')} />
      </div>

      <div className="flex flex-col gap-1 mb-6 w-96">
        <label htmlFor="file-upload-3">
          <img src={avatarPreview || defaultProfile} alt="" />
        </label>

        <input
          type="file"
          name="myFile"
          id="file-upload-3"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => handleAvatarChange(e)}
          hidden
        />

        <Input
          id="username"
          label={t('username')}
          onChange={({ target }) => setUsername(target.value)}
          placeholder="pedrito777"
          type="text"
          value={username}
          required
        />

        <Input
          id="name"
          label={t('name')}
          onChange={({ target }) => setName(target.value)}
          placeholder="pedro"
          type="text"
          value={name}
          required
        />

        <button
          type="submit"
          className="text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
        >
          {t('saveprofile')}
        </button>

        {/* <button
          type="submit"
          className="text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-red-600 hover:bg-red-700 focus:ring-blue-800 mt-4"
        >
          Delete Account
        </button> */}
      </div>
    </form>
  );
}

export default Profile;
