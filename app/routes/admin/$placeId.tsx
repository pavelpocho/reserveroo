import { OpeningTime, Prisma, PrismaPromise, Reservable } from '@prisma/client';
import { Form, useLoaderData } from '@remix-run/react';
import { ActionFunction, json, LoaderFunction, redirect } from '@remix-run/server-runtime';
import { useState } from 'react';
import styled from 'styled-components';
import { ArrayInput } from '~/components/inputs/ArrayInput';
import { IdInput } from '~/components/inputs/ObjectInput';
import { TextInput } from '~/components/inputs/TextInput';
import { TimeInput } from '~/components/inputs/TimeInput';
import { updateOpeningTime } from '~/models/openingTime.server';
import { getPlace, Place, updatePlace } from '~/models/place.server';
import { createReservable, deleteReservable, updateReservable } from '~/models/reservable.server';
import { getDateObjectFromTimeString } from '~/utils/forms';

interface AdminPlaceDetailLoaderData {
  place: (Place & {
    reservables: Reservable[];
    openingTimes: OpeningTime[];
  });
}

export const loader: LoaderFunction = async ({ request, params }) => {
  if (!params.placeId) return json({})
  return json({ place: await getPlace({ id: params.placeId }) });
}

export const action: ActionFunction = async ({ request }) => {

  const form = await request.formData();
  const getFormItem = (key: string) => form.get(key)?.toString() ?? '';
  const getFormItems = (key: string) => form.getAll(key).map(r => r.toString());

  const place: Pick<Place, 'id' | 'name'> = {
    id: getFormItem('id'),
    name: getFormItem('name')
  }

  const reservables: Pick<Reservable, 'id' | 'name' | 'placeId'>[] = getFormItems('reservableId[]').map((id, i) => {
    return {
      id,
      name: getFormItems('reservableName[]')[i],
      placeId: place.id
    }
  });

  const openingTimes: Pick<OpeningTime, 'id' | 'open' | 'close'>[] = getFormItems('openingTime[]').map((id, i) => {
    return {
      id,
      open: getDateObjectFromTimeString(getFormItems('open[]')[i]),
      close: getDateObjectFromTimeString(getFormItems('close[]')[i]),
    }
  });

  const deletedReservableIds = getFormItems('deletedReservable[]');

  await Promise.all([
    ...reservables.map(r => r.id == '-1' ? createReservable(r) : updateReservable(r)),
    ...openingTimes.map(ot => updateOpeningTime(ot)),
    ...deletedReservableIds.map(id => deleteReservable({ id })),
    updatePlace(place)
  ]);

  return redirect('/admin/places');
}

const ArrayInputWrap = styled.div`
  display: flex;
`;

export default function AdminPlaceDetail() {

  const { place: defaultPlace } = useLoaderData<AdminPlaceDetailLoaderData>();

  const [ place, setPlace ] = useState<(Place & {
    reservables: Reservable[];
    openingTimes: OpeningTime[];
  })>(defaultPlace);

  const [ deletedReservables, setDeletedReservables ] = useState<string[]>([]);

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const deleteReservable = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    e.preventDefault();
    if (id != '-1') {
      setDeletedReservables([...deletedReservables, id])
    }
    setPlace({
      ...place,
      reservables: [...place.reservables.filter(rx => rx.id != id)]
    });
  }

  const addReservable = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setPlace({
      ...place,
      reservables: [
        ...place.reservables,
        {
          id: '-1',
          name: '',
          createdAt: new Date(),
          updatedAt: new Date(),
          placeId: place.id
        }
      ]
    });
  }

  return (
    <div>
      <Form method='post'>

        <IdInput name='id' value={place?.id} />        
        <TextInput name='name' title='Name' defaultValue={place?.name} />

        <ArrayInput
          arrayTitle={'Reservables'}
          deletedIdsName={'deletedReservable[]'}
          deletedIds={deletedReservables}
          onAdd={(e) => { addReservable(e); }}
          addButtonText='Add new reservable'
        >
          { place.reservables.map(r => <ArrayInputWrap key={r.id}>
            <IdInput name='reservableId[]' value={r.id} />
            <TextInput title='Reservable name' name='reservableName[]' defaultValue={r.name} />
            <button onClick={(e) => { deleteReservable(e, r.id); }}>Delete</button>
          </ArrayInputWrap>) }
        </ArrayInput>

        <ArrayInput arrayTitle='Opening times'>
          { place.openingTimes.sort((a, b) => a.day - b.day).map(t => <ArrayInputWrap key={t.id}>
            <p>{daysOfWeek[t.day]}</p>
            <IdInput name='openingTime[]' value={`${t.id}`} />
            <TimeInput title='Open:' name='open[]' defaultValue={new Date(t.open)} />
            <TimeInput title='Close:' name='close[]' defaultValue={new Date(t.close)} />
          </ArrayInputWrap>) }
        </ArrayInput>

        <input type='submit'/>
      </Form>
    </div>
  )
}