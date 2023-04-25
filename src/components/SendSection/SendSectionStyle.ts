import styled from 'styled-components';

export const SendSectionLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
`;

export const ImagePreviewBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #2b2d42;
  margin-right: 14px;
  margin-left: 14px;

  padding: 10px;
  border-radius: 10px;
`;

export const Preview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

export const BtnChooseFile = styled.label`
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  color: white;
  border-radius: 10px;
  font-size: 30px;
  text-align: center;
  border: 0;
  background-color: royalblue;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  outline: none;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
`;
