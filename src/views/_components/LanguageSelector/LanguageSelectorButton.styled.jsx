import styled from 'styled-components';
export const LanguageSelectorButton = styled.button`
  background-color: ${({active}) => active ? "#444" : "default"};
  color: ${({active}) => active ? "#fff" : "default"}
`;