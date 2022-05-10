import { LoaderFunction } from "@remix-run/node";
import { Form, useSubmit } from "@remix-run/react";
import styled from "styled-components"
import SearchIcon from "~/assets/icons/Search";
import { styles } from "~/constants/styles";
import { useLangs } from "~/contexts/langsContext";

interface SearchBarProps {
  defaultValue?: string
}

const SearchBarWrap = styled.div`
  height: 1.8rem;
  max-width: 1000px;
  background-color: ${styles.colors.white};
  border: 1px solid ${styles.colors.gray[30]};
  border-radius: 0.6rem;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  gap: 0.9rem;
  align-items: center;
  padding: 0.5rem 1rem;
  & input {
    border: none;
    outline: none;
    width: 50ch;
    font-size: 1.2rem;
  }
`;

export const SearchBar: React.FC<SearchBarProps> = ({ defaultValue }: SearchBarProps) => {

  const submit = useSubmit();
  const l = useLangs();

  return <SearchBarWrap>
    <SearchIcon height={'1rem'} fill={styles.colors.gray[90]} />
    <Form method='get' onChange={(e) => submit(e.currentTarget)} >
      <input placeholder={l.searchPlaceholder} name='searchTerm' type='text' defaultValue={defaultValue} />
    </Form>
  </SearchBarWrap>
}