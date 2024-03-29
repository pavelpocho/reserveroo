import { MultilingualDesc, MultilingualName, Tag } from '@prisma/client';
import { Form, useLoaderData } from '@remix-run/react';
import { ActionFunction, json, LoaderFunction, redirect } from '@remix-run/server-runtime';
import { useState } from 'react';
import styled from 'styled-components';
import { MultiSelectorInput } from '~/components/inputs/MultiSelectorInput';
import { IdInput } from '~/components/inputs/ObjectInput';
import { SingleSelectorInput } from '~/components/inputs/SingleSelectorInput';
import { TextInput } from '~/components/inputs/TextInput';
import { getTag, updateTag } from '~/models/tag.server';
import { TagWithTexts } from '~/types/types';
import { getFormEssentials } from '~/utils/forms';

interface AdminTagDetailLoaderData {
  tag: Tag & {
    multiLangName: MultilingualName | null;
    multiLangDesc: MultilingualDesc | null;
  };
}

export const loader: LoaderFunction = async ({ request, params }) => {
  if (!params.tagId) return json({})
  return json({ tag: await getTag({ id: params.tagId }) });
}

export const action: ActionFunction = async ({ request }) => {

  const { getFormItem, getFormItems } = await getFormEssentials(request);

  const tag = {
    id: getFormItem('id'),
    multiLangName: { id: '-1', czech: getFormItem('nameCzech'), english: getFormItem('nameEnglish') },
    multiLangDesc: { id: '-1', czech: getFormItem('descriptionCzech'), english: getFormItem('descriptionEnglish') },
    hidden: getFormItem('hidden') == '1'
  }

  await updateTag(tag);

  return redirect('/admin/tags');

}

const ArrayInputWrap = styled.div`
  display: flex;
`;

export default function AdminTagDetail() {

  const { tag } = useLoaderData<AdminTagDetailLoaderData>();

  return (
    <div>
      <p>TAG: {tag.multiLangName?.czech}</p>
      <Form method='post'>

        <IdInput name='id' value={tag?.id} />        
        <TextInput name='nameCzech' title='Name (Czech)' defaultValue={tag?.multiLangName?.czech} />
        <TextInput name='descriptionCzech' title='Description (Czech)' defaultValue={tag?.multiLangDesc?.czech} />
        <TextInput name='nameEnglish' title='Name (English)' defaultValue={tag?.multiLangName?.english} />
        <TextInput name='descriptionEnglish' title='Description (English)' defaultValue={tag?.multiLangDesc?.english} />
        <SingleSelectorInput name='hidden' possibleValuesAndTexts={[{ value: '1', text: 'Hidden' }, { value: '0', text: 'Visible' }]} defaultValueAndText={{ value: tag?.hidden ? '1' : '0', text: tag?.hidden ? 'Hidden' : 'Visible' }} />

        <input type='submit'/>
      </Form>
    </div>
  )
}