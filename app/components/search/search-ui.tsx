import { Category, Location, Tag } from "@prisma/client";
import { Form, useSubmit } from "@remix-run/react";
import React from "react";
import styled from "styled-components";
import { styles } from "~/constants/styles";
import { langsContext, useLangs } from "~/contexts/langsContext";
import { CategoryWithTexts, LocationWithEverything, LocationWithTexts, TagWithTexts } from "~/types/types";
import { Button } from "../button";
import { MultiSelectorInput } from "../inputs/MultiSelectorInput";
import { SingleSelectorInput } from "../inputs/SingleSelectorInput";
import { TextInput } from "../inputs/TextInput";
import { LocationPicker } from "./location-picker";
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
  margin-top: 4rem;
  position: relative;
  padding: 1.25rem 2.75rem;
  background-color: ${styles.colors.action};
  border-radius: 0.5rem;
`;

const Title = styled.h4`
  margin: 0.8rem 0 0.5rem;
  color: ${styles.colors.primary};
  font-weight: 800;
  font-size: 1rem;
`;

const SearchFlyout = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 0 0 0.6rem 0.6rem;
  margin-top: -0.5rem;
  padding-top: 0.5rem;
  position: relative;
  box-sizing: border-box;
  padding: 0.8rem;
`;

const FlyoutSection = styled.div`
  width: 100%;
  padding: 0.3rem 0 1rem 0;
`;

const TagCategoryButton = styled.button<{ selected: boolean }>`
  height: 2rem;
  padding: 0 1rem;
  border-radius: 1rem;
  color: ${props => props.selected ? styles.colors.white : styles.colors.primary};
  background-color: ${props => props.selected ? styles.colors.primary : styles.colors.gray[10]};
  border: none;
  cursor: pointer;
`;

const FlyoutSectionHeader = styled.h5`
  margin: 0.8rem 0 0 0;
`;

const Flex = styled.div`
  display: flex;
`;

export const SearchUI: React.FC<SearchUIProps> = ({ searchParams, locations, tags, categories }) => {

  const [ selectedLocation, setSelectedLocation ] = React.useState<Location | null>(null);
  const [ selectedCategories, setSelectedCategories ] = React.useState<CategoryWithTexts[]>([]);
  const [ selectedTags, setSelectedTags ] = React.useState<TagWithTexts[]>([]);

  const [ searchBarActive, setSearchBarActive ] = React.useState(false);
  const submit = useSubmit();

  const { lang } = useLangs();

  const getLocationDescription = (l: LocationWithEverything) => `${l.multiLangCity ? l.multiLangCity[lang] : ''}, ${l.multiLangCountry ? l.multiLangCountry[lang] : ''}`;

  return <Wrap>
    <Form method='get' action='/search' onChange={(e) => submit(e.currentTarget)} >
      <Flex>
        <Title>Location</Title>
        <SingleSelectorInput name='selectedLocation' possibleValuesAndTexts={locations.map(l => ({ value: l.cityCountry, text: getLocationDescription(l) }))} defaultValueAndText={null}  />
        <Title>Category</Title>
        <MultiSelectorInput name='categories[]' possibleValuesAndTexts={categories.map(c => ({ value: c.id, text: c.multiLangName ? c.multiLangName[lang] : '' }))} defaultValuesAndTexts={[]} />
      </Flex>
      <SearchBar setSearchBarActive={setSearchBarActive} defaultValue={searchParams.get('searchTerm') ?? ''}></SearchBar>
      { selectedCategories.map(c => <input key={c.id} hidden={true} type={'text'} name='categories[]' value={c.id} />)  }
      { selectedTags.map(t => <input key={t.id} hidden={true} type={'text'} name='tags[]' value={t.id} />)  }
      <SearchFlyout>
        <FlyoutSectionHeader>Categories</FlyoutSectionHeader>
        <FlyoutSection>{
          categories.map(c => <TagCategoryButton selected={!!selectedCategories.find(sc => sc.id == c.id)} onClick={() => {
            setSelectedCategories(() => {
              if (selectedCategories.find(sc => sc.id == c.id)) {
                return selectedCategories.filter(sc => sc.id != c.id);
              }
              else {
                return [...selectedCategories, c];
              }
            })
          }} key={c.id}>{c.multiLangName && c.multiLangName[lang]}</TagCategoryButton>)
        }</FlyoutSection>
        <FlyoutSectionHeader>Tags</FlyoutSectionHeader>
        <FlyoutSection>{
          tags.map(t => <TagCategoryButton selected={!!selectedTags.find(st => st.id == t.id)} onClick={() => {
            setSelectedTags(() => {
              if (selectedTags.find(st => st.id == t.id)) {
                return selectedTags.filter(st => st.id != t.id);
              }
              else {
                return [...selectedTags, t];
              }
            })
          }} key={t.id}>{t.multiLangName && t.multiLangName[lang]}</TagCategoryButton>)
        }</FlyoutSection>
      </SearchFlyout>
    </Form>
  </Wrap>

// return <Wrap>
// <Form method='get' action='/search' onChange={(e) => submit(e.currentTarget)} >
//   <Title>Where are you?</Title>
//   <LocationPicker selectedLocation={selectedLocation} locations={locations} setLocation={setSelectedLocation} />
//   <Title>What are you looking for?</Title>
//   <SearchBar setSearchBarActive={setSearchBarActive} defaultValue={searchParams.get('searchTerm') ?? ''}></SearchBar>
//   { selectedCategories.map(c => <input key={c.id} hidden={true} type={'text'} name='categories[]' value={c.id} />)  }
//   { selectedTags.map(t => <input key={t.id} hidden={true} type={'text'} name='tags[]' value={t.id} />)  }
//   { <input key={selectedLocation?.id} hidden={true} type={'text'} name='selectedLocation' value={selectedLocation?.cityCountry} /> }
//   <SearchFlyout>
//     <FlyoutSectionHeader>Categories</FlyoutSectionHeader>
//     <FlyoutSection>{
//       categories.map(c => <TagCategoryButton selected={!!selectedCategories.find(sc => sc.id == c.id)} onClick={() => {
//         setSelectedCategories(() => {
//           if (selectedCategories.find(sc => sc.id == c.id)) {
//             return selectedCategories.filter(sc => sc.id != c.id);
//           }
//           else {
//             return [...selectedCategories, c];
//           }
//         })
//       }} key={c.id}>{c.multiLangName && c.multiLangName[lang]}</TagCategoryButton>)
//     }</FlyoutSection>
//     <FlyoutSectionHeader>Tags</FlyoutSectionHeader>
//     <FlyoutSection>{
//       tags.map(t => <TagCategoryButton selected={!!selectedTags.find(st => st.id == t.id)} onClick={() => {
//         setSelectedTags(() => {
//           if (selectedTags.find(st => st.id == t.id)) {
//             return selectedTags.filter(st => st.id != t.id);
//           }
//           else {
//             return [...selectedTags, t];
//           }
//         })
//       }} key={t.id}>{t.multiLangName && t.multiLangName[lang]}</TagCategoryButton>)
//     }</FlyoutSection>
//   </SearchFlyout>
// </Form>
// </Wrap>
}