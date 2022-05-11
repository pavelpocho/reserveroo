import { Tag } from '@prisma/client';
import { Form, useLoaderData } from '@remix-run/react';
import { ActionFunction, json, LoaderFunction, redirect } from '@remix-run/server-runtime';
import { useState } from 'react';
import styled from 'styled-components';
import { IdInput } from '~/components/inputs/ObjectInput';
import { TextInput } from '~/components/inputs/TextInput';
import { getTag, updateTag } from '~/models/tag.server';
import { getFormEssentials } from '~/utils/forms';

interface AdminTagDetailLoaderData {
  tag: Tag;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  if (!params.tagId) return json({})
  const x = { tag: await getTag({ id: params.tagId }) };
  console.log(x.tag);
  return json({ tag: await getTag({ id: params.tagId }) });
}

export const action: ActionFunction = async ({ request }) => {

  const { getFormItem, getFormItems } = await getFormEssentials(request);

  const tag: Pick<Tag, 'id' | 'name' | 'description'> = {
    id: getFormItem('id'),
    name: getFormItem('name'),
    description: getFormItem('description'),
  }

  await updateTag(tag);

  return redirect('/admin/tags');

}

const ArrayInputWrap = styled.div`
  display: flex;
`;

export default function AdminTagDetail() {

  console.log("Rendering tag detail in admin");

  const { tag: defaultTag } = useLoaderData<AdminTagDetailLoaderData>();

  const [ tag, setTag ] = useState<Tag>(defaultTag);

  return (
    <div>
      <p>TAG: {tag.name}</p>
      <Form method='post'>

        <IdInput name='id' value={tag?.id} />        
        <TextInput name='name' title='Name' defaultValue={tag?.name} />
        <TextInput name='description' title='Description' defaultValue={tag?.description} />

        <input type='submit'/>
      </Form>
    </div>
  )
}