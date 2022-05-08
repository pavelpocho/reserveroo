import { Form, useActionData, useLoaderData, useMatches, useParams } from '@remix-run/react';
import { ActionFunction, json, LoaderFunction, redirect } from '@remix-run/server-runtime'
import { useUserId } from '~/contexts/userIdContext';
import { getPlace } from '~/models/place.server';
import { getReservableList, Reservable } from '~/models/reservable.server';
import { createReservation } from '~/models/reservation.server';
import { createReservationGroup } from '~/models/reservationGroup.server';
import { requireUserIdAndAdmin } from '~/utils/session.server'

interface ReserveLoaderData {
  userId: string,
  reservables: Reservable[]
}

export type ReserveActionData = {
  formError?: string;
  fields?: {
    note: string;
    userId: string;
    placeId: string;
  };
};

const badRequest = (data: ReserveActionData) => json(data, { status: 400 });

export const loader: LoaderFunction = async ({ request, params }) => {
  // Return availability data
  const { userId } = await requireUserIdAndAdmin(request);
  const place = await getPlace({ id: params.placeId ?? '' });
  const reservables = place?.reservables;
  return json({ userId, reservables })
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const note = form.get('note')?.toString();
  const placeId = form.get('placeId')?.toString();
  const userId = form.get('userId')?.toString();
  const reservableId = form.get('reservableId')?.toString();

  if (!note || !placeId || !userId || !reservableId || note == '') {
    return badRequest({
      fields: {
        note: note ?? '', placeId: placeId ?? '', userId: userId ?? ''
      },
      formError: 'Fill everything in pls.'
    })
  }

  const resGroup = await createReservationGroup({ note, userId });
  const res = await createReservation({ reservableId: reservableId ?? null, reservationGroupId: resGroup.id ?? null })

  // Here you can return actionData instead to show a confirmation dialog and then
  // redirect to the details from there or something
  return redirect(`/profile`);
}

export default function Reservation() {

  const params = useParams();
  const { userId, reservables } = useLoaderData<ReserveLoaderData>();
  const actionData = useActionData<ReserveActionData>();

  return (
    <Form method='post'>
      {/* <input type='date'></input>
      <input type='time'></input> */}
      <input type='text' name='userId' hidden={true} defaultValue={userId}></input>
      <input type='text' name='placeId' hidden={true} defaultValue={params.placeId}></input>
      <input type='text' name='note' defaultValue={actionData?.fields?.note ?? ''}></input>
      <p>Reservable</p>
      { reservables.map(r => <div key={r.id}><input type='radio' name='reservableId' value={r.id} />{r.name}</div>) }
      <input type='submit'></input>
      {
        actionData?.formError && <p>{actionData.formError ?? ''}</p>
      }
    </Form>
  )
}