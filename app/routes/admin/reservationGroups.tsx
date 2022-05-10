import { Company, Reservable, Reservation } from '@prisma/client';
import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import { ActionFunction, json, LoaderFunction } from '@remix-run/server-runtime'
import styled from 'styled-components';
import { AdminReservationGroupSummary } from '~/components/admin/reservation-group-summary';
import { IdInput } from '~/components/inputs/ObjectInput';
import { ReservationGroupSummary } from '~/components/profile/reservation-group-summary';
import { Place } from '~/models/place.server';
import { changeReservationStatus, setStatusOfReservationsInGroup, updateReservation } from '~/models/reservation.server';
import { getReservationGroupList, ReservationGroup } from '~/models/reservationGroup.server'
import { User } from '~/models/user.server';
import { ReservationStatus } from '~/types/types';

interface ReservationsAdminLoaderData {
  reservationGroups: (ReservationGroup & {
    user: User | null;
    reservations: (Reservation & {
        reservable: (Reservable & {
            place: (Place & {
              company: Company | null;
            });
        }) | null;
    })[];
})[]
}

export const loader: LoaderFunction = async () => {
  const reservationGroups = await getReservationGroupList();
  return json({ reservationGroups });
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  // TODO: Validation
  const reservationGroupId = formData.get('rgId')?.toString();
  const status = parseInt(formData.get('status')?.toString() ?? '');

  if (!reservationGroupId || isNaN(status)) {
    // return error message
    return {}
  }

  console.log(reservationGroupId);
  console.log(status);

  await setStatusOfReservationsInGroup({ reservationGroupId, status });

  return {}
}

const Wrap = styled.div`
  
`;

const Title = styled.h4`
  
`;

export default function ReservationsAdmin() {

  const { reservationGroups } = useLoaderData<ReservationsAdminLoaderData>();
  const submit = useSubmit();

  const handleChange = (rgId: string, form: HTMLFormElement) => {
    submit(form, { replace: true });
  }

  return <Wrap>
    <Title>Reservations</Title>
    { reservationGroups.map(rg => <AdminReservationGroupSummary key={rg.id} reservationGroup={rg} onChangeStatus={(rgId, form) => {
        handleChange(rgId, form);
    }} />) }
  </Wrap>
}