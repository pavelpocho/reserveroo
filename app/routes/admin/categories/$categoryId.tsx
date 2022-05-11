import { Category } from '@prisma/client';
import { Form, useLoaderData } from '@remix-run/react';
import { ActionFunction, json, LoaderFunction, redirect } from '@remix-run/server-runtime';
import { useState } from 'react';
import styled from 'styled-components';
import { IdInput } from '~/components/inputs/ObjectInput';
import { TextInput } from '~/components/inputs/TextInput';
import { getCategory, updateCategory } from '~/models/category.server';
import { getFormEssentials } from '~/utils/forms';

interface AdminPlaceDetailLoaderData {
  category: Category;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  if (!params.categoryId) return json({})
  const x = { category: await getCategory({ id: params.categoryId }) };
  console.log(x.category);
  return json({ category: await getCategory({ id: params.categoryId }) });
}

export const action: ActionFunction = async ({ request }) => {

  const { getFormItem, getFormItems } = await getFormEssentials(request);

  const category: Pick<Category, 'id' | 'name'> = {
    id: getFormItem('id'),
    name: getFormItem('name')
  }

  await updateCategory(category);

  return redirect('/admin/categories');

}

const ArrayInputWrap = styled.div`
  display: flex;
`;

export default function AdminCategoryDetail() {

  console.log("Rendering category detail in admin");

  const { category: defaultPlace } = useLoaderData<AdminPlaceDetailLoaderData>();

  const [ category, setCategory ] = useState<Category>(defaultPlace);

  return (
    <div>
      <p>CATEGORY {category.name}</p>
      <Form method='post'>

        <IdInput name='id' value={category?.id} />        
        <TextInput name='name' title='Name' defaultValue={category?.name} />

        <input type='submit'/>
      </Form>
    </div>
  )
}