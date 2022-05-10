import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/server-runtime';
import { getUserById } from '~/models/user.server';
import { requireUserIdAndAdmin } from '~/utils/session.server';
import { Company, Place, Reservable, Reservation, ReservationGroup, User } from '@prisma/client';
import { ReservationStatus } from '~/types/types';
import { ReservationGroupSummary } from '~/components/profile/reservation-group-summary';
import { AccountSummary } from '~/components/profile/account-summary';
import styled from 'styled-components';
import { styles } from '~/constants/styles';
import { IdInput } from '~/components/inputs/ObjectInput';

interface ProfileLoaderData {
  user: User & {
    reservationGroups: (ReservationGroup & {
      reservations: (Reservation & {
        reservable: (Reservable & {
          place: Place
        }) | null;
      })[];
    })[];
  } | null
}

export const loader: LoaderFunction = async ({ request }) => {
  return { user: await getUserById({ id: (await requireUserIdAndAdmin(request)).userId })};
}

const ReservationsWrap = styled.div`
  padding: 2rem;
  background-color: ${styles.colors.gray[5]};
`;

const ReservationsTitle = styled.h4`
  margin-top: 0;
`;

export default function Profile() {

  const { user } = useLoaderData<ProfileLoaderData>();
  const submit = useSubmit();

  const cancelRg = (form: HTMLFormElement) => {
    submit(form, { replace: true })
  }

  return (
    <div>
      <AccountSummary user={user ? { username: user?.username, email: user?.email, createdAt: user?.createdAt } : null} />
      <ReservationsWrap>
        <ReservationsTitle>Your Reservations</ReservationsTitle>
        { user?.reservationGroups.filter(rg => !rg.reservations.find(r => r.status == ReservationStatus.Cancelled)).map(rg => <div key={rg.id}>
          <>
            <ReservationGroupSummary onCancel={(rgId, formRef) => {
              setTimeout(() => {
                cancelRg(formRef);
              }, 450);
            }} reservationGroup={rg} />
          </>
        </div>) }
      </ReservationsWrap>
    </div>
  )
}