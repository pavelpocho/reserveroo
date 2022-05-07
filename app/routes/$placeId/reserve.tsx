import { json, LoaderFunction } from '@remix-run/server-runtime'

export const loader: LoaderFunction = () => {
  // Return availability data
  return json({})
}

export default function Reservation() {
  return (
    <div>RESERVATION FORM</div>
  )
}