import { OpeningTime, Prisma, PrismaPromise, Reservable } from '@prisma/client';
import { Form, useLoaderData } from '@remix-run/react';
import { ActionFunction, json, LoaderFunction, redirect } from '@remix-run/server-runtime';
import { useState } from 'react';
import { getPlace, Place, updatePlace } from '~/models/place.server';
import { createReservable, deleteReservable, updateReservable } from '~/models/reservable.server';

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
  const id = form.get('id')?.toString() ?? '';
  const name = form.get('name')?.toString() ?? '';
  const reservableIds = form.getAll('reservableId[]').map(r => r.toString());
  const reservableNames = form.getAll('reservableName[]').map(r => r.toString());
  const deletedReservableIds = form.getAll('deletedReservable[]').map(r => r.toString());
  const createdReservables: Promise<Reservable>[] = [];
  const deletedReservables: PrismaPromise<Prisma.BatchPayload>[] = [];

  reservableIds.forEach((r, i) => {
    if (r == '-1') {
      createdReservables.push(createReservable({ placeId: id, name: reservableNames[i] }))
    }
    else {
      createdReservables.push(updateReservable({ id: r, placeId: id, name: reservableNames[i] }))
    }
  })

  deletedReservableIds.forEach((i) => {
    deletedReservables.push(deleteReservable({ id: i }));
  })

  await Promise.all(createdReservables);
  await Promise.all(deletedReservables);
  await updatePlace({ id, name });

  return redirect('/admin/places');
}

export default function AdminPlaceDetail() {

  const { place: defaultPlace } = useLoaderData<AdminPlaceDetailLoaderData>();

  const [ place, setPlace ] = useState<(Place & {
    reservables: Reservable[];
    openingTimes: OpeningTime[];
  })>(defaultPlace);

  const [ deletedReservabled, setDeletedReservables ] = useState<string[]>([]);

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div>
      <Form method='post'>
        <input type='text' name='id' hidden={true} defaultValue={place?.id} />
        <label>Name</label>
        <input type='text' name='name' defaultValue={place?.name} />
        <label>Reservables</label>
        { place.reservables.map(r => <div key={r.id}>
          <input type='hidden' name='reservableId[]' defaultValue={r.id}></input>
          <input type='text' name='reservableName[]' defaultValue={r.name} /><button onClick={(e) => {
            e.preventDefault();
            if (r.id != '-1') {
              setDeletedReservables([...deletedReservabled, r.id])
            }
            setPlace({
              ...place,
              reservables: [...place.reservables.filter(rx => rx.id != r.id)]
            });
          }}>Delete</button>
        </div>) }
        <button onClick={(e) => {
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
          })
        }}>Add new reservable</button>
        { deletedReservabled.map(d => <input key={d} hidden={true} name='deletedReservable[]' value={d} readOnly />) }
        <label>Opening times</label>
        {/* { place.openingTimes.map(t => <div key={t.id}>
          <label>{daysOfWeek[t.day]}</label>
          <input name='openTime[]' type='time' defaultValue={`${t.open.toString()}} />
          <input name='closeTime[]' type='time' defaultValue={t.close.toString()} />
        </div>) } */}
        <input type='submit'/>
      </Form>
    </div>
  )
}