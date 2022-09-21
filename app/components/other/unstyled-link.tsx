import { Link } from "@remix-run/react";
import styled from "styled-components";
import { styles } from "~/constants/styles";

export const UnstyledLink = styled(Link)`
  color: ${styles.colors.white};
  text-decoration: none;
`;