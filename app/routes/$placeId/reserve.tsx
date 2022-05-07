import { json, LoaderFunction } from '@remix-run/server-runtime'
import { requireUserId } from '~/utils/session.server'

export const loader: LoaderFunction = async ({ request }) => {
  // Return availability data
  const userId = await requireUserId(request);
  return json({})
}

export default function Reservation() {
  return (
    <div>RESERVATION FORM</div>
  )
}