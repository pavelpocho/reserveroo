import { Form } from "@remix-run/react";
import React, {useState} from "react";
import styled from "styled-components";
import CircleInfoIcon from "~/assets/icons/CircleInfo";
import SearchIcon from "~/assets/icons/Search";
import { styles } from "~/constants/styles";
import { useLangs } from "~/contexts/langsContext";
import { CategoryWithTexts, LocationWithEverything, TagWithTexts } from "~/types/types";
import InfoButton from "../info-button";
import { MultiSelectorInput } from "../inputs/MultiSelectorInput";
import { IdInput } from "../inputs/ObjectInput";
import { SingleSelectorInput } from "../inputs/SingleSelectorInput";
import { SearchBar } from "./search-bar";

interface SearchUIProps {
  searchParams: URLSearchParams,
  locations: LocationWithEverything[],
  tags: TagWithTexts[],
  categories: CategoryWithTexts[],
  narrowView?: boolean
}

const Wrap = styled.div<{ narrowView: boolean }>`
  max-width: 800px;
  margin: 3rem auto 0;
  position: relative;
  padding: 1.25rem 2.75rem;
  @media (max-width: 550px) {
    padding: 1.25rem;
  }
  @media (min-width: 550px) {
    border-radius: 0.5rem;
  }
  ${props => props.narrowView ? `
    padding: 1.25rem;
    margin-top: 0;
    @media (max-width: 800px) {
      width: 100%;
      box-sizing: border-box;
    }
  ` : ''}
  background-color: ${styles.colors.action};
`;

const Title = styled.h4`
  margin: 0;
  line-height: 2.375rem;
  color: ${styles.colors.black};
  font-weight: 800;
  font-size: 1rem;
`;

export const TagCategoryButton = styled.button<{ selected: boolean, noCursor?: boolean }>`
  height: 1.875rem;
  padding: 0 1rem;
  font-weight: 600;
  font-size: 0.8125rem;
  border-radius: 1rem;
  color: ${props => props.selected ? styles.colors.white : styles.colors.primary};
  background-color: ${props => props.selected ? styles.colors.primary : styles.colors.white};
  box-shadow: ${styles.shadows[2]};
  border: none;
  cursor: ${props => props.noCursor ? '' : 'pointer'};
`;

const ShowMoreButton = styled.button`
  height: 1.875rem;
  padding: 0 1rem;
  font-weight: 600;
  font-size: 0.8125rem;
  border-radius: 0.375rem;
  color: ${styles.colors.white};
  background-color: transparent;
  border: 1px solid white;
  cursor: pointer;
`;

const Flex = styled.div<{ narrowView: boolean }>`
  display: grid;
  align-items: center;
  grid-template-rows: 2.375rem;
  grid-template-columns: minmax(0, auto) 2.2rem 1fr 1.5rem minmax(0, auto) 2.2rem 1fr;
  ${props => !props.narrowView ? `@media (max-width: 800px) {
    grid-template-columns: minmax(0, auto) 2.2rem 1fr;
    row-gap: 1.5rem;
  }` : ''}
  @media (max-width: 550px) {
    grid-template-columns: minmax(0, auto) 1fr;
    row-gap: 0.2rem;
  }
  ${props => props.narrowView ? `
    grid-template-columns: minmax(0, auto) 1fr;
    row-gap: 0.2rem;
  ` : ''}
  gap: 0.4rem;
`;

const TagFlex = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

const LargeSpacer = styled.div<{ narrowView: boolean }>`
  @media (max-width: 800px) {
    display: none;
  }
  ${props => props.narrowView ? `
    display: none;
  ` : ''}
`;


const InputFieldWrap = styled.div<{ narrowView: boolean }>`
  @media (max-width: 550px) {
    grid-column: 1 / span 2;
  }
  ${props => props.narrowView ? `
    grid-column: 1 / span 2;
  ` : ''}
`;

export const SearchUI: React.FC<SearchUIProps> = ({ searchParams, locations, tags, categories, narrowView }) => {

  function getSelectedTags(t: TagWithTexts) {
      const isTagInSelectedTags = selectedTags.find(st => st.id == t.id);
      return isTagInSelectedTags ? selectedTags.filter(st => st.id != t.id) : [...selectedTags, t];
  }

  const locationCityCountry = searchParams.get('selectedLocation');
  const tagIds = searchParams.getAll('tags[]');
  const categoryIds = searchParams.getAll('categories[]');
  const [ selectedTags, setSelectedTags ] = useState<TagWithTexts[]>(tags.filter(t => tagIds.includes(t.id)));
  const [showAllTags, setShowAllTags] = useState<boolean>(false);
  const { lang } = useLangs();

  const defaultLocation = locations.find(l => l.cityCountry == locationCityCountry);
  const defaultLocationName = defaultLocation?.multiLangCity && defaultLocation?.multiLangCountry ? (
    `${defaultLocation.multiLangCity[lang]}, ${defaultLocation.multiLangCountry[lang]}`
  ) : null

  const defaultCategories = categoryIds.map(ci => categories.find(c => c.id == ci));
  const defaultCategoryNames = defaultCategories.every(c => c != null) ? defaultCategories.map(c => c?.multiLangName ? `${c.multiLangName[lang]}` : null) : [];

  const MAX_NUMBER_OF_TAGS_SHOWN = 5;

  const getLocationDescription = (l: LocationWithEverything) => `${l.multiLangCity ? l.multiLangCity[lang] : ''}, ${l.multiLangCountry ? l.multiLangCountry[lang] : ''}`;

  return <Wrap narrowView={narrowView ?? false}>
    <StyledForm method='get' action='/search'>
      <Flex narrowView={narrowView ?? false}>
        <Title>Location</Title>
        <InfoButton helpText={`Pick a city where you want to perfrom your search. Please note that our services aren't yet available everywhere.`}/>
        <InputFieldWrap narrowView={narrowView ?? false} >
          <SingleSelectorInput
            placeholder={'Pick a location'}
            name='selectedLocation'
            possibleValuesAndTexts={locations.map(l => ({ value: l.cityCountry, text: getLocationDescription(l) }))}
            defaultValueAndText={locationCityCountry && defaultLocationName ? {
              value: locationCityCountry,
              text: defaultLocationName
            } : null}
          />
        </InputFieldWrap>
        <LargeSpacer narrowView={narrowView ?? false}></LargeSpacer>
        <Title>Categories</Title>
        <InfoButton helpText='Categories describe what kind of activity you can do at a place.' />
        <InputFieldWrap narrowView={narrowView ?? false}>
          <MultiSelectorInput
            placeholder='Pick categories'
            name='categories[]'
            possibleValuesAndTexts={categories.map(c => ({ value: c.id, text: c.multiLangName ? c.multiLangName[lang] : '' }))}
            defaultValuesAndTexts={defaultCategoryNames.length > 0 ? defaultCategoryNames.map((c, i) => ({ value: categoryIds[i], text: c ?? '' })) : []}
          />
        </InputFieldWrap>
      </Flex>
      { selectedTags.map(t => <input key={t.id} hidden={true} type={'text'} name='tags[]' value={t.id} readOnly={true} />)  }
      <TagFlex>
        <Title>Tags</Title>
        <InfoButton helpText='Tags show additional attractive aspects of a place.' />
        {
          tags.slice(0, showAllTags ? tags.length : MAX_NUMBER_OF_TAGS_SHOWN)
              .map(t =>
              <TagCategoryButton selected={!!selectedTags.find(st => st.id == t.id)} onClick={(e) => {
            e.preventDefault();
            setSelectedTags(() => getSelectedTags(t));
          }} key={t.id}>{t.multiLangName && t.multiLangName[lang]}</TagCategoryButton>)
        }
        {tags.length > MAX_NUMBER_OF_TAGS_SHOWN && <ShowMoreButton onClick={e => {
          e.preventDefault();
          setShowAllTags(!showAllTags);
        }}>
        {showAllTags ? '– Show Less' : '+ Show All'}
      </ShowMoreButton>}
      </TagFlex>
      <SearchBar defaultValue={searchParams.get('searchTerm') ?? ''}></SearchBar>
      <IdInput name='page' value='1'></IdInput>
      <SearchButton>Search<SearchIcon height={'1rem'} fill={styles.colors.white} /></SearchButton>
    </StyledForm>
  </Wrap>
}
