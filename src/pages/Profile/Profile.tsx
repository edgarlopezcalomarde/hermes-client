/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';

import { useNavigate } from 'react-router-dom';
import CURRENT_USER_LOGGED from '../../graphql/queries/CURRENT_USER_LOGGED';
import UPDATE_USER from '../../graphql/mutations/UPDATE_USER';
import { convertToBase64 } from '../../utils/helpers';
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
    <form
      className="flex h-full w-full justify-center items-center"
      onSubmit={handleSubmit}
    >
      <div className="switchMode">
        <ToggleButton />
      </div>

      <div className="absolute top-6 left-6 text-5xl">
        <MdOutlineKeyboardBackspace onClick={() => navigate('/chatlist')} />
      </div>

      <div className="flex flex-col gap-1 mb-6 w-96">
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

        <div className="mb-6">
          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Username
          </p>
          <input
            type="text"
            id="username"
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="pedrito"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name
          </p>
          <input
            type="text"
            id="name"
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="pedrito"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
        >
          Save Profile
        </button>
      </div>
    </form>
  );
}

export default Profile;
