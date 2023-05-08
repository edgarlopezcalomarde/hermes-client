/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaLocationArrow } from 'react-icons/fa';

import ALL_MESSAGE_BETWEN_USERS from '../../graphql/queries/ALL_MESSAGE_BETWEN_USERS';
import NEW_MESSAGE from '../../graphql/mutations/NEW_MESSAGE';
import { convertToBase64 } from '../../utils/helpers';
import Modal from '../Modal/Modal';

function SendSection() {
  const currentUser = JSON.parse(localStorage.getItem('current-user')!);
  const location = useLocation();
  const reciver = location.state.participants.filter(
    (participant: any) => participant.id !== currentUser.id,
  )[0];

  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState<any>(null);

  const [newMessage] = useMutation(NEW_MESSAGE, {
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

  const [open, setOpen] = useState(false);

  const handleSend = () => {
    newMessage({
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
    setOpen(true);
  };

  return (
    <div className="flex flex-row items-center h-16 rounded-xl bg-tertiary w-full px-4 mt-auto  ">
      <Modal title="Preview" onClose={() => setOpen(false)} visible={open}>
        {imagePreview && (
          <div className="flex justify-center">
            <img src={imagePreview} alt="preview" className="h-40 rounded" />
          </div>
        )}
      </Modal>

      <input
        type="file"
        name="myFile"
        id="upload"
        accept=".jpeg, .png, .jpg"
        onChange={(e) => handleSearchImage(e)}
        hidden
      />

      <label
        className="flex items-center justify-center  hover:text-gray-600 text-2xl cursor-pointer"
        htmlFor="upload"
      >
        🔗
      </label>

      <button
        type="button"
        className="text-2xl cursor-pointer"
        onClick={() => setOpen(true)}
      >
        🖼
      </button>

      <div className="flex-grow ml-4">
        <div className="relative w-full">
          <input
            type="text"
            className="flex w-full border rounded-md  pl-4 h-9 text-gray-900 border 
            border-gray-300 rounded-lg
            bg-gray-50 
            focus:ring-blue-500 
            focus:border-blue-500 
            bg-secondary
            border-quaternary
            dark:placeholder-gray-400 
            dark:text-white 
            dark:focus:ring-blue-500 
            dark:focus:border-blue-500 
            outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="button"
            className="absolute flex items-center justify-center h-full w-12 right-0 top-0"
          >
            🥴
          </button>
        </div>
      </div>

      <div className="ml-4">
        <button
          className="flex items-center justify-center bg-accent hover:bg-accent-secondary rounded-md text-text-base gap-2 px-4 py-1 flex-shrink-0 h-9"
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
