import { Location } from '@prisma/client';
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import { ActionFunction, LoaderFunction, redirect } from '@remix-run/server-runtime';
import { useState } from 'react';
import styled from 'styled-components';
import { IdInput } from '~/components/inputs/ObjectInput';
import { TextInput } from '~/components/inputs/TextInput';
import { createLocation } from '~/models/location.server';
import { badRequest, getFormEssentials } from '~/utils/forms';

interface LocationActionData {
  field?: {
    city: string | null,
    country: string | null
  }
}

export const loader: LoaderFunction = async ({ request, params }) => {
  return {};
}

export const action: ActionFunction = async ({ request }) => {

  const { getFormItem, getFormItems } = await getFormEssentials(request);

  const location: Pick<Location, 'id' | 'city' | 'country'> = {
    id: getFormItem('id'),
    city: getFormItem('city'),
    country: getFormItem('country'),
  }

  if (!location.id || !location.city || !location.country) {
    return badRequest<LocationActionData>({ field: { city: location.city, country: location.country } });
  }

  await createLocation(location);

  return redirect('/admin/locations');

}

const ArrayInputWrap = styled.div`
  display: flex;
`;

export default function AdminLocationNew() {

  const a = useActionData<LocationActionData>();

  const location = { id: '-1', city: a?.field?.city, country: a?.field?.country };

  return (
    <div>
      <p>TAG {location.city}</p>
      <Form method='post'>

        <IdInput name='id' value={'-1'} />        
        <TextInput name='city' title='City' defaultValue={location.city ?? ''} />
        <TextInput name='country' title='Country' defaultValue={location.country ?? ''} />

        <input type='submit'/>
      </Form>
    </div>
  )
}