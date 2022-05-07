import { Link, Outlet, useSearchParams } from '@remix-run/react'
import type { LoaderFunction } from '@remix-run/server-runtime'

export const loader: LoaderFunction = () => {
  return {}
}

export default function Authenticate() {

  const [searchParams] = useSearchParams();
  const redirectTo = encodeURI(searchParams.get('redirectTo') ?? '').replace('/', '%2F');

  return <>
    <p>Welcome (back)</p>
    <Link to={`/authenticate/login${!!redirectTo ? `?redirectTo=${redirectTo}` : ''}`}>Sign In</Link>
    <Link to={`/authenticate/register${!!redirectTo ? `?redirectTo=${redirectTo}` : ''}`}>Create Account</Link>
    <div>
      <Outlet />
    </div>
  </>
}