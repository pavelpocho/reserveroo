import { ActionFunction, redirect } from '@remix-run/server-runtime'
import { setStatusOfReservationsInGroup } from '~/models/reservation.server';
import { getReservationGroup, getReservationGroupForConfirmationEmail } from '~/models/reservationGroup.server';
import { ReservableWithCountForEmail, ReservationStatus } from '~/types/types';
import { sendCancellationEmail } from '~/utils/emails.server';
import { getFormEssentials } from '~/utils/forms';

export const action: ActionFunction = async ({ request }) => {

  const { getFormItem } = await getFormEssentials(request);
  const reservationGroupId = getFormItem('rgId');

  await setStatusOfReservationsInGroup({ reservationGroupId, status: ReservationStatus.Cancelled });

  const reservationGroup = await getReservationGroupForConfirmationEmail({ id: reservationGroupId });
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

  const resGroup = await getReservationGroup({ id: reservationGroupId });
  if (resGroup?.user?.email) await sendCancellationEmail(
    resGroup?.user?.email,
    reservationGroup?.reservations[0].reservable?.place?.name ?? '',
    typesWithAmount
  );
  
  return redirect('/profile');
}

export default function CancelReservation() {
  return (
    <div></div>
  )
}