import styled from 'styled-components';

export const Button = styled.button`
  padding: 14px;
  border-radius: 10px;

  background-color: royalblue;
  border: 0;
  margin-top: 20px;

  font-size: 20px;
  font-weight: 700;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  letter-spacing: 1px;

  color: white;
  cursor: pointer;
`;

export const LoginLayout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--background);
`;
