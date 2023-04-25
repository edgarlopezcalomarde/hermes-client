import styled from 'styled-components';

export const List = styled.ul`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
`;

export const ListItem = styled.li`
  list-style: none;
  border: #bbbdff 1px solid;
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
`;

export const ListItemBox = styled.div`
  display: flex;
  gap: 16px;
`;
