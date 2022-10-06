import { ActionFunction, redirect } from "@remix-run/server-runtime";
import { setRGAttendance } from "~/models/reservationGroup.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  // TODO: Validation
  const reservationGroupId = formData.get('rgId')?.toString();
  const attended = formData.get('attended')?.toString();

  if (reservationGroupId === '' || reservationGroupId == null || attended === null) {
    // return error message
    return redirect('/admin/reservations', {})
  }

  await setRGAttendance({ id: reservationGroupId, attended: attended === 't' });

  return redirect('/admin/reservations', {})
}

export default function SetAttendance() {
  return <></>
}