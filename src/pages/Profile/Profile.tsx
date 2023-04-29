/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';

import { useNavigate } from 'react-router-dom';
import CURRENT_USER_LOGGED from '../../graphql/queries/CURRENT_USER_LOGGED';
import UPDATE_USER from '../../graphql/mutations/UPDATE_USER';
import { convertToBase64 } from '../../utils/helpers';
import ToggleButton from '../../components/ToggleButton/ToggleButton';
import Input from '../../components/Input/Input';

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

        <Input
          id="username"
          label="Username"
          onChange={({ target }) => setUsername(target.value)}
          placeholder="pedrito777"
          type="text"
          value={username}
          required
        />

        <Input
          id="name"
          label="Name"
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
          Save Profile
        </button>
      </div>
    </form>
  );
}

export default Profile;
