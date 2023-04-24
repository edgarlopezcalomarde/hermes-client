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
import {
  BtnChooseFile,
  ImagePreviewBox,
  Preview,
  SendSectionLayout,
} from './SendSectionStyle';

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
    <SendSectionLayout>
      <ImagePreviewBox>
        {imagePreview && <Preview src={imagePreview} alt="preview" />}
      </ImagePreviewBox>

      <div className="sendSection">
        <input
          type="text"
          placeholder="Escribe un mensaje......"
          className="inputMessage"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <input
          type="file"
          name="myFile"
          id="upload"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => handleSearchImage(e)}
          hidden
        />

        <BtnChooseFile htmlFor="upload">
          <GrFormUpload />
        </BtnChooseFile>

        <button className="btnSend" onClick={handleSend} type="submit">
          <FaLocationArrow />
        </button>
      </div>
    </SendSectionLayout>
  );
}

export default SendSection;
