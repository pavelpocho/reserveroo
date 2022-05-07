import { LinksFunction } from "@remix-run/react/routeModules"
import styled from 'styled-components';
import { styles } from "~/constants/styles";

const Text = styled.h6`
  color: ${styles.colors.primary};
  font-size: 24px;
`;

export const AppHeader: React.FC = ({ children }) => {
  return <div className='app-header'>
    <Text>{children}</Text>
  </div>
}