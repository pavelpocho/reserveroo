import { useLoaderData } from '@remix-run/react';
import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime';
import { json } from '@remix-run/server-runtime'
import { useState } from 'react';
import styled from 'styled-components';
import { AdminReservationGroupSummary } from '~/components/admin/reservation-group-summary';
import { UserReservationSummary } from '~/components/admin/user-stat-summary';
import { setStatusOfReservation } from '~/models/reservation.server';
import { getReservationGroupForConfirmationEmail } from '~/models/reservationGroup.server'
import { getUserListForAttendance } from '~/models/user.server';
import type { ReservableWithCountForEmail} from '~/types/types';
import { ReservationStatus } from '~/types/types';
import { sendStatusUpdateEmail } from '~/utils/emails.server';
import { getBaseUrl } from '~/utils/forms';

interface UserAdminLoaderData {
  users: {
    username: string,
    reservationGroups: {
        attended: boolean;
    }[]
  }[]
}


export const loader: LoaderFunction = async () => {
  const users = await getUserListForAttendance();
  return json({ users: users.map(u => ({ username: u.username, reservationGroups: u.reservationGroups })) });
}


export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  // TODO: Validation
  const reservationGroupId = formData.get('rgId')?.toString();
  const action = formData.get('action')?.toString();

  if (!reservationGroupId || !action) {
    // return error message
    return {}
  }

  const reservationGroup = await getReservationGroupForConfirmationEmail({ id: reservationGroupId });

  const promises: Promise<object>[] = [];
  
  reservationGroup?.reservations.forEach(r => {
    if (action == 'confirm_preferred') {
      if (!r.backup) {
        promises.push(setStatusOfReservation({ id: r.id, status: ReservationStatus.Confirmed }));
      }
      else {
        promises.push(setStatusOfReservation({ id: r.id, status: ReservationStatus.Cancelled }));
      }
    } else if (action == 'unavailable') {
      promises.push(setStatusOfReservation({ id: r.id, status: ReservationStatus.Rejected }));
    } else if (action == 'confirm_backup') {
      if (r.backup) {
        promises.push(setStatusOfReservation({ id: r.id, status: ReservationStatus.Confirmed }));
      }
      else {
        promises.push(setStatusOfReservation({ id: r.id, status: ReservationStatus.Rejected }));
      }
    }
  });

  await Promise.all(promises);

  const reservablesWithBackup = reservationGroup?.reservations.filter(r => !r.backup).map(x => x.reservable).map((r, i) => ({
    reservable: r,
    backup: false
  })) ?? [];

  const typesWithAmount: ReservableWithCountForEmail[] = [];
  const reservableTypes = reservablesWithBackup.map(r => r?.reservable?.ReservableType);
  reservableTypes.forEach(rt => {
    let cur = typesWithAmount.find(t => t.type == rt?.multiLangName?.english);
    if (cur) {
      cur.amount += 1;
    }
    else {
      typesWithAmount.push({ amount: 1, type: rt?.multiLangName?.english ?? '' });
    }
  });

  if (reservationGroup?.user && reservationGroup?.reservations[0].reservable?.place) {
    await sendStatusUpdateEmail(
      getBaseUrl(request),
      reservationGroup?.user?.email,
      action,
      reservationGroup.reservations[0].reservable.place.name,
      typesWithAmount
    );
  }

  return {}
}

const Title = styled.h4`
  
`;

export default function ReservationAdminList() {

  const { users } = useLoaderData<UserAdminLoaderData>();

  return <>
    <Title>Users</Title>
    { users.map((user, i) =>
      <UserReservationSummary key={i} user={user} />
    ) }
  </>
}