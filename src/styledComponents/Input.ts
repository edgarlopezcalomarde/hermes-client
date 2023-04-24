import styled from 'styled-components';

export const Input = styled.input`
  font-family: 'Montserrat', sans-serif;
  width: 100%;

  padding: 12px;

  caret-color: #0068ff;
  font-weight: 600;

  border: 0;
  border-radius: 4px;

  &:hover {
    background-color: #eaedf3;
  }
`;

export const FormLayout = styled.form`
  display: flex;
  flex-direction: column;

  gap: 20px;
  width: 420px;
`;

export const FormInput = styled.input`
  padding: 14px;
  border-radius: 10px;
  outline: 0;
  background-color: rgb(199, 199, 199);
  border: 0;
  color: black;
  width: 100%;
  font-size: 16px;
  font-weight: 500;
`;

export const FormLabel = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: var(--text-primary);
  padding-left: 0px;
`;

export const Href = styled.div`
  margin-top: 20px;
  font-weight: 600;
  font-size: 18px;
  text-decoration: underline;
  color: var(--text-primary);

  display: flex;
  align-items: center;
  gap: 10px;

  cursor: pointer;
`;
