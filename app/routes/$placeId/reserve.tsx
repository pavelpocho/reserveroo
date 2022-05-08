import { Form, useActionData, useLoaderData, useMatches, useParams } from '@remix-run/react';
import { ActionFunction, json, LoaderFunction, redirect } from '@remix-run/server-runtime'
import { useUserId } from '~/contexts/userIdContext';
import { createReservation } from '~/models/reservation.server';
import { requireUserIdAndAdmin } from '~/utils/session.server'

interface ReserveLoaderData {
  userId: string
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

export const loader: LoaderFunction = async ({ request }) => {
  // Return availability data
  const { userId } = await requireUserIdAndAdmin(request);
  return json({ userId })
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const note = form.get('note')?.toString();
  const placeId = form.get('placeId')?.toString();
  const userId = form.get('userId')?.toString();

  if (!note || !placeId || !userId || note == '') {
    return badRequest({
      fields: {
        note: note ?? '', placeId: placeId ?? '', userId: userId ?? ''
      },
      formError: 'Fill everything in pls.'
    })
  }

  await createReservation({ note, placeId, userId });

  // Here you can return actionData instead to show a confirmation dialog and then
  // redirect to the details from there or something
  return redirect(`/${placeId}`)
}

export default function Reservation() {

  const params = useParams();
  const { userId } = useLoaderData<ReserveLoaderData>();
  const actionData = useActionData<ReserveActionData>();

  return (
    <Form method='post'>
      {/* <input type='date'></input>
      <input type='time'></input> */}
      <input type='text' name='userId' hidden={true} defaultValue={userId}></input>
      <input type='text' name='placeId' hidden={true} defaultValue={params.placeId}></input>
      <input type='text' name='note' defaultValue={actionData?.fields?.note ?? ''}></input>
      <input type='submit'></input>
      {
        actionData?.formError && <p>{actionData.formError ?? ''}</p>
      }
    </Form>
  )
}