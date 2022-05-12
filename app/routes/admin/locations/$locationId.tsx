import { Location } from '@prisma/client';
import { Form, useLoaderData } from '@remix-run/react';
import { ActionFunction, json, LoaderFunction, redirect } from '@remix-run/server-runtime';
import { useState } from 'react';
import styled from 'styled-components';
import { IdInput } from '~/components/inputs/ObjectInput';
import { TextInput } from '~/components/inputs/TextInput';
import { getLocation, updateLocation } from '~/models/location.server';
import { getFormEssentials } from '~/utils/forms';

interface AdminLocationDetailLoaderData {
  location: Location;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  if (!params.locationId) return json({})
  const x = { location: await getLocation({ id: params.locationId }) };
  return json({ location: await getLocation({ id: params.locationId }) });
}

export const action: ActionFunction = async ({ request }) => {

  const { getFormItem, getFormItems } = await getFormEssentials(request);

  const location: Pick<Location, 'id' | 'city' | 'country'> = {
    id: getFormItem('id'),
    city: getFormItem('city'),
    country: getFormItem('country'),
  }

  await updateLocation(location);

  return redirect('/admin/locations');

}

const ArrayInputWrap = styled.div`
  display: flex;
`;

export default function AdminLocationDetail() {

  const { location: defaultLocation } = useLoaderData<AdminLocationDetailLoaderData>();

  const [ location, setLocation ] = useState<Location>(defaultLocation);

  return (
    <div>
      <p>LOCATION: {location.city} in {location.country}</p>
      <Form method='post'>

        <IdInput name='id' value={location?.id} />        
        <TextInput name='city' title='City' defaultValue={location?.city} />
        <TextInput name='country' title='Country' defaultValue={location?.country} />

        <input type='submit'/>
      </Form>
    </div>
  )
}