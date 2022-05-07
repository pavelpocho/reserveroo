import { LoaderFunction } from "@remix-run/node";
import { Form, useSubmit } from "@remix-run/react";
import styled from "styled-components"
import SearchIcon from "~/assets/icons/Search";
import { styles } from "~/constants/styles";
import { useLangs } from "~/contexts/translationContext";

interface SearchBarProps {
  defaultValue?: string
}

const SearchBarWrap = styled.div`
  height: 2.5rem;
  width: 80%;
  max-width: 1000px;
  background-color: ${styles.colors.gray[10]};
  border: 2px solid ${styles.colors.gray[20]};
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0.5rem 1.5rem;
`;

export const SearchBar: React.FC<SearchBarProps> = ({ defaultValue }: SearchBarProps) => {

  const submit = useSubmit();
  const l = useLangs();

  return <SearchBarWrap>
    <SearchIcon height={'1.5rem'} fill={styles.colors.gray[90]} />
    <Form method='get' onChange={(e) => submit(e.currentTarget)} >
      <input placeholder={l.searchPlaceholder} name='searchTerm' type='text' defaultValue={defaultValue} />
    </Form>
  </SearchBarWrap>
}