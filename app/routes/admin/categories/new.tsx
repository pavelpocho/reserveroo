import { Company } from '@prisma/client';
import { Form, useActionData } from '@remix-run/react';
import { ActionFunction, LoaderFunction, redirect } from '@remix-run/server-runtime';
import styled from 'styled-components';
import { IdInput } from '~/components/inputs/ObjectInput';
import { TextInput } from '~/components/inputs/TextInput';
import { createCategory } from '~/models/category.server';
import { badRequest, getFormEssentials } from '~/utils/forms';

interface CategoryActionData {
  field?: {
    name: string | null
  }
}

export const loader: LoaderFunction = async ({ request, params }) => {
  return {};
}

export const action: ActionFunction = async ({ request }) => {

  const { getFormItem, getFormItems } = await getFormEssentials(request);

  const category: Pick<Company, 'id' | 'name'> = {
    id: getFormItem('id'),
    name: getFormItem('name')
  }

  if (!category.id || !category.name) {
    return badRequest<CategoryActionData>({ field: { name: category.name } });
  }

  await createCategory(category);

  return redirect('/admin/categories');

}

const ArrayInputWrap = styled.div`
  display: flex;
`;

export default function AdminCompanyDetail() {

  const a = useActionData<CategoryActionData>();

  const category = { id: '-1', name: a?.field?.name };

  return (
    <div>
      <p>CATEGORY {category.name}</p>
      <Form method='post'>

        <IdInput name='id' value={'-1'} />        
        <TextInput name='name' title='Name' defaultValue={category.name ?? ''} />

        <input type='submit'/>
      </Form>
    </div>
  )
}