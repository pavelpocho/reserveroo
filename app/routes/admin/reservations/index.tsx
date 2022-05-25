import { Company, Reservable, Reservation } from '@prisma/client';
import { useLoaderData, useSubmit } from '@remix-run/react';
import { ActionFunction, json, LoaderFunction } from '@remix-run/server-runtime'
import styled from 'styled-components';
import { AdminReservationGroupSummary } from '~/components/admin/reservation-group-summary';
import { IdInput } from '~/components/inputs/ObjectInput';
import { ReservationGroupSummary } from '~/components/profile/reservation-group-summary';
import { Place } from '~/models/place.server';
import { changeReservationStatus, setStatusOfReservation, setStatusOfReservationsInGroup, updateReservation } from '~/models/reservation.server';
import { getReservationGroup, getReservationGroupForConfirmationEmail, getReservationGroupList, ReservationGroup } from '~/models/reservationGroup.server'
import { User } from '~/models/user.server';
import { ReservationStatus } from '~/types/types';
import { sendStatusUpdateEmail } from '~/utils/emails.server';

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

  if (reservationGroup?.user && reservationGroup?.reservations[0].reservable?.place) { 
    if (action == 'confirm_preferred') {
      await sendStatusUpdateEmail(
        reservationGroup?.user?.email,
        'confirm_preferred',
        reservationGroup?.reservations[0].reservable?.place,
        reservationGroup.reservations[0].start
      );
    } else if (action == 'unavailable') {
      await sendStatusUpdateEmail(
        reservationGroup?.user?.email,
        'unavailable',
        reservationGroup?.reservations[0].reservable?.place,
        reservationGroup.reservations[0].start
      );
    } else if (action == 'confirm_backup') {
      await sendStatusUpdateEmail(
        reservationGroup?.user?.email,
        'confirm_backup',
        reservationGroup?.reservations[0].reservable?.place,
        reservationGroup.reservations[0].start
      );
    }
  }

  return {}
}

const Title = styled.h4`
  
`;

export default function ReservationAdminList() {

  const { reservationGroups } = useLoaderData<ReservationsAdminLoaderData>();

  return <>
    <Title>Reservations</Title>
    { reservationGroups.map(rg => <AdminReservationGroupSummary key={rg.id} reservationGroup={rg} />) }
  </>
}