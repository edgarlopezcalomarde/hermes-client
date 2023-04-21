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
  flex: 0.4;
  padding: 10px;
  margin-top: 60px;
  border: #bbbdff 1px solid;
  border-radius: 6px;
`;

export const ChatPanel = styled.div`
  flex: 1;
  border: #bbbdff 1px solid;
  max-width: 968px;
  border-radius: 6px;
`;

export const RightPanel = styled.div`
  flex: 0.4;

  display: flex;
  flex-direction: column;
`;
