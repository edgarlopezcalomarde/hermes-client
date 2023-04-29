/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaLocationArrow } from 'react-icons/fa';
import './SendSection.css';
import { GrFormUpload } from 'react-icons/gr';

import ALL_MESSAGE_BETWEN_USERS from '../../graphql/queries/ALL_MESSAGE_BETWEN_USERS';
import CREATE_MESSAGE from '../../graphql/mutations/CREATE_MESSAGE';
import { convertToBase64 } from '../../utils/helpers';

function SendSection() {
  const currentUser = JSON.parse(localStorage.getItem('current-user')!);
  const location = useLocation();
  const reciver = location.state.participants.filter(
    (participant: any) => participant.id !== currentUser.id,
  )[0];

  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState<any>(null);

  const [createMessage] = useMutation(CREATE_MESSAGE, {
    refetchQueries: [
      {
        query: ALL_MESSAGE_BETWEN_USERS,
        variables: { userId1: currentUser.id, userId2: reciver.id },
      },
    ],
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSend = () => {
    createMessage({
      variables: {
        text: message || '🖼',
        receiver: reciver.id,
        sender: currentUser.id,
        image: imagePreview,
      },
    });
    setImagePreview('');
    setMessage('');
  };

  const handleSearchImage = async (e: any) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImagePreview(base64);
  };

  return (
    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4 mt-auto  ">
      {/* <ImagePreviewBox>
          {imagePreview && <Preview src={imagePreview} alt="preview" />}
        </ImagePreviewBox> */}

      <input
        type="file"
        name="myFile"
        id="upload"
        accept=".jpeg, .png, .jpg"
        onChange={(e) => handleSearchImage(e)}
        hidden
      />

      <label
        className="flex items-center justify-center text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
        htmlFor="upload"
      >
        <GrFormUpload />
      </label>

      <div className="flex-grow ml-4">
        <div className="relative w-full">
          <input
            type="text"
            className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="button"
            className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
          >
            🥴
          </button>
        </div>
      </div>

      <div className="ml-4">
        <button
          className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
          onClick={handleSend}
          type="submit"
        >
          <span>Send</span>
          <FaLocationArrow />
        </button>
      </div>
    </div>
  );
}

export default SendSection;
