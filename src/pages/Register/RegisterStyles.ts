import styled from 'styled-components';

export const RegisterLayout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--background);
`;

export const Logo = styled.div`
  color: var(--text-primary);
  text-align: center;
  font-size: 60px;
  font-weight: 700;
`;

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
`;