import { LoaderFunction } from "@remix-run/node";
import { Form, useSubmit } from "@remix-run/react";
import React from "react";
import styled from "styled-components"
import SearchIcon from "~/assets/icons/Search";
import { styles } from "~/constants/styles";
import { useLangs } from "~/contexts/langsContext";

interface SearchBarProps {
  defaultValue?: string,
  setSearchBarActive: (searchBarActive: boolean) => void
}

const SearchBarWrap = styled.div`
  height: 1.8rem;
  z-index: 2;
  background-color: ${styles.colors.white};
  border: 1px solid ${styles.colors.gray[30]};
  border-radius: 0.6rem;
  display: flex;
  position: relative;
  align-items: stretch;
  justify-content: stretch;
  gap: 0.9rem;
  align-items: center;
  padding: 0.5rem 1rem;
  & input {
    border: none;
    outline: none;
    font-size: 1.2rem;
    flex-grow: 1;
  }
`;

export const SearchBar: React.FC<SearchBarProps> = ({ defaultValue, setSearchBarActive }: SearchBarProps) => {

  const { translations: l } = useLangs();

  return <SearchBarWrap>
    <SearchIcon height={'1rem'} fill={styles.colors.gray[90]} />
    <input onSelect={() => {
      setSearchBarActive(true);
    }} onBlur={() => {
      setSearchBarActive(false);
    }} placeholder={l.searchPlaceholder} name='searchTerm' type='text' defaultValue={defaultValue} />
  </SearchBarWrap>
}