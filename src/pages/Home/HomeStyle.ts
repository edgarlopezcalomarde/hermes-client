import styled from 'styled-components';

export const HomePageLayout = styled.div`
  color: var(--text-primary);
  display: flex;
  height: 100vh;
  background-color: var(--background);

  padding: 20px;
  gap: 16px;
`;

export const LeftPanel = styled.div`
  border: 2px solid red;
  flex: 0.4;

  padding: 10px;

  margin-top: 60px;

  border: #bbbdff 1px solid;
  border-radius: 6px;
`;

export const ChatPanel = styled.div`
  flex: 1;
`;

export const RightPanel = styled.div`
  border: 2px solid blue;
  flex: 0.4;

  display: flex;
  flex-direction: column;
`;
