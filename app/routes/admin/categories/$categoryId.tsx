import type { MultilingualName } from '@prisma/client';
import { Form, useLoaderData } from '@remix-run/react';
import type { ActionFunction, LoaderFunction} from '@remix-run/server-runtime';
import { json, redirect } from '@remix-run/server-runtime';
import styled from 'styled-components';
import { MultiSelectorInput } from '~/components/inputs/MultiSelectorInput';
import { IdInput } from '~/components/inputs/ObjectInput';
import { SingleSelectorInput } from '~/components/inputs/SingleSelectorInput';
import { TextInput } from '~/components/inputs/TextInput';
import { useLangs } from '~/contexts/langsContext';
import { getCategory, updateCategory } from '~/models/category.server';
import type { CategoryWithTexts } from '~/types/types';
import { getFormEssentials } from '~/utils/forms';

interface AdminPlaceDetailLoaderData {
  category: CategoryWithTexts | null;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  if (!params.categoryId) return json({})
  return json({ category: await getCategory({ id: params.categoryId }) });
}

export const action: ActionFunction = async ({ request }) => {

  const { getFormItem, getFormItems } = await getFormEssentials(request);

  const category: MultilingualName = {
    // this is not the categoryid, dont worry
    id: '-1',
    czech: getFormItem('nameCzech'),
    english: getFormItem('nameEnglish'),
  }

  await updateCategory({ multiLangName: category, id: getFormItem('id'), hidden: getFormItem('hidden') == '1' });

  return redirect('/admin/categories');

}

const ArrayInputWrap = styled.div`
  display: flex;
`;

export default function AdminCategoryDetail() {

  const { category } = useLoaderData<AdminPlaceDetailLoaderData>();

  const { lang } = useLangs();

  return (
    <div>
      <p>CATEGORY {category?.multiLangName && category?.multiLangName[lang]}</p>
      <Form method='post'>

        <IdInput name='id' value={category?.id ?? ''} />        
        <TextInput name='nameEnglish' title='Name (English)' defaultValue={category?.multiLangName?.english ?? ''} />
        <TextInput name='nameCzech' title='Name (Czech)' defaultValue={category?.multiLangName?.czech ?? ''} />
        <SingleSelectorInput name='hidden' possibleValuesAndTexts={[{ value: '1', text: 'Hidden' }, { value: '0', text: 'Visible' }]} defaultValueAndText={{ value: category?.hidden ? '1' : '0', text: category?.hidden ? 'Hidden' : 'Visible' }} />

        <input type='submit'/>
      </Form>
    </div>
  )
}