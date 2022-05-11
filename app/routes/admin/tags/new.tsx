import { Tag } from '@prisma/client';
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import { ActionFunction, LoaderFunction, redirect } from '@remix-run/server-runtime';
import { useState } from 'react';
import styled from 'styled-components';
import { IdInput } from '~/components/inputs/ObjectInput';
import { TextInput } from '~/components/inputs/TextInput';
import { createTag } from '~/models/tag.server';
import { badRequest, getFormEssentials } from '~/utils/forms';

interface TagActionData {
  field?: {
    name: string | null,
    description: string | null
  }
}

export const loader: LoaderFunction = async ({ request, params }) => {
  return {};
}

export const action: ActionFunction = async ({ request }) => {

  const { getFormItem, getFormItems } = await getFormEssentials(request);

  const tag: Pick<Tag, 'id' | 'name' | 'description'> = {
    id: getFormItem('id'),
    name: getFormItem('name'),
    description: getFormItem('description'),
  }

  if (!tag.id || !tag.name || !tag.description) {
    return badRequest<TagActionData>({ field: { name: tag.name, description: tag.description } });
  }

  await createTag(tag);

  return redirect('/admin/tags');

}

const ArrayInputWrap = styled.div`
  display: flex;
`;

export default function AdminTagNew() {

  console.log("Rendering tag detail in admin");

  const a = useActionData<TagActionData>();

  const tag = { id: '-1', name: a?.field?.name, description: a?.field?.description };

  return (
    <div>
      <p>TAG {tag.name}</p>
      <Form method='post'>

        <IdInput name='id' value={'-1'} />        
        <TextInput name='name' title='Name' defaultValue={tag.name ?? ''} />
        <TextInput name='description' title='Description' defaultValue={tag.description ?? ''} />

        <input type='submit'/>
      </Form>
    </div>
  )
}