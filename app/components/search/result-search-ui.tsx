import { Form } from "@remix-run/react";
import React from "react";
import styled from "styled-components";
import CircleInfoIcon from "~/assets/icons/CircleInfo";
import SearchIcon from "~/assets/icons/Search";
import { styles } from "~/constants/styles";
import { useLangs } from "~/contexts/langsContext";
import { CategoryWithTexts, LocationWithEverything, TagWithTexts } from "~/types/types";
import { MultiSelectorInput } from "../inputs/MultiSelectorInput";
import { SingleSelectorInput } from "../inputs/SingleSelectorInput";
import { SearchBar } from "./search-bar";

interface SearchUIProps {
  searchParams: URLSearchParams,
  locations: LocationWithEverything[],
  tags: TagWithTexts[],
  categories: CategoryWithTexts[]
}

const Wrap = styled.div`
  max-width: 800px;
  width: 100%;
  flex: 0.5;
  margin-right: 1.75rem;
  position: relative;
  padding: 1.25rem 1.625rem;
  background-color: ${styles.colors.action};
  border-radius: 0.5rem;
`;

const Title = styled.h4`
  margin: 0;
  line-height: 2.375rem;
  color: ${styles.colors.black};
  font-weight: 800;
  font-size: 1rem;
`;

const TagCategoryButton = styled.button<{ selected: boolean }>`
  height: 1.875rem;
  padding: 0 1rem;
  font-weight: 600;
  font-size: 0.8125rem;
  border-radius: 1rem;
  color: ${props => props.selected ? styles.colors.white : styles.colors.primary};
  background-color: ${props => props.selected ? styles.colors.primary : styles.colors.white};
  box-shadow: ${styles.shadows[1]};
  border: none;
  cursor: pointer;
`;

const Flex = styled.div`
  display: grid;
  align-items: center;
  height: 2.25rem;
  grid-template-rows: 2.375xrem;
  grid-template-columns: minmax(0, auto) 2.2rem 1fr;
  gap: 0.4rem;
`;

const TagFlex = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const TagTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const InfoButton = styled.button`
  background-color: transparent;
  border: none;
  flex-shrink: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  width: 1.6rem;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SearchButton = styled.button`
  margin: 0px;
  border-radius: 0.375rem;
  border: none;
  background-color: ${styles.colors.primary};
  color: ${styles.colors.white};
  font-weight: 700;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 3.25rem;
  width: 10rem;
  margin: 0px auto;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  &:hover {
    transform: scale(1.08);
  }
  box-shadow: ${styles.shadows[0]};
`;

export const ResultSearchUI: React.FC<SearchUIProps> = ({ searchParams, locations, tags, categories }) => {

  const locationCityCountry = searchParams.get('selectedLocation');
  const tagIds = searchParams.getAll('tags[]');
  const categoryIds = searchParams.getAll('categories[]');
  const [ selectedTags, setSelectedTags ] = React.useState<TagWithTexts[]>(tags.filter(t => tagIds.includes(t.id)));
  const { lang } = useLangs();

  const defaultLocation = locations.find(l => l.cityCountry == locationCityCountry);
  const defaultLocationName = defaultLocation?.multiLangCity && defaultLocation?.multiLangCountry ? (
    `${defaultLocation.multiLangCity[lang]}, ${defaultLocation.multiLangCountry[lang]}`
  ) : null

  const defaultCategories = categoryIds.map(ci => categories.find(c => c.id == ci));
  const defaultCategoryNames = defaultCategories.every(c => c != null) ? defaultCategories.map(c => c?.multiLangName ? `${c.multiLangName[lang]}` : null) : [];

  console.log(categoryIds);

  const getLocationDescription = (l: LocationWithEverything) => `${l.multiLangCity ? l.multiLangCity[lang] : ''}, ${l.multiLangCountry ? l.multiLangCountry[lang] : ''}`;

  return <Wrap>
    <StyledForm method='get' action='/search'>
      <Flex>
        <Title>Location</Title>
        <InfoButton onClick={(e) => {
          e.preventDefault();
        }}><CircleInfoIcon height={'0.75rem'} /></InfoButton>
        <SingleSelectorInput
          placeholder={'Pick a location'}
          name='selectedLocation'
          possibleValuesAndTexts={locations.map(l => ({ value: l.cityCountry, text: getLocationDescription(l) }))}
          defaultValueAndText={locationCityCountry && defaultLocationName ? {
            value: locationCityCountry,
            text: defaultLocationName
          } : null} 
        />
      </Flex>
      <Flex>
        <Title>Categories</Title>
        <InfoButton onClick={(e) => {
          e.preventDefault();
        }}><CircleInfoIcon height={'0.75rem'} /></InfoButton>
        <MultiSelectorInput
          placeholder='Pick categories'
          name='categories[]'
          possibleValuesAndTexts={categories.map(c => ({ value: c.id, text: c.multiLangName ? c.multiLangName[lang] : '' }))}
          defaultValuesAndTexts={defaultCategoryNames.length > 0 ? defaultCategoryNames.map((c, i) => ({ value: categoryIds[i], text: c ?? '' })) : []}
        />
      </Flex>
      { selectedTags.map(t => <input key={t.id} hidden={true} type={'text'} name='tags[]' value={t.id} readOnly={true} />)  }
      <TagFlex>
        <TagTitle>
          <Title>Tags</Title>
          <InfoButton onClick={(e) => {
            e.preventDefault();
          }}><CircleInfoIcon height={'0.75rem'} /></InfoButton>
        </TagTitle>
        {
          tags.map(t => <TagCategoryButton selected={!!selectedTags.find(st => st.id == t.id)} onClick={(e) => {
            e.preventDefault();
            setSelectedTags(() => {
              if (selectedTags.find(st => st.id == t.id)) {
                return selectedTags.filter(st => st.id != t.id);
              }
              else {
                return [...selectedTags, t];
              }
            })
          }} key={t.id}>{t.multiLangName && t.multiLangName[lang]}</TagCategoryButton>)
        }
      </TagFlex>
      <SearchBar defaultValue={searchParams.get('searchTerm') ?? ''}></SearchBar>
      <SearchButton>Search<SearchIcon height={'1rem'} fill={styles.colors.white} /></SearchButton>
    </StyledForm>
  </Wrap>
}