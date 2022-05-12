import { Form, useActionData, useLoaderData, useSearchParams, useSubmit } from '@remix-run/react'
import { ActionFunction, json, LoaderFunction } from '@remix-run/server-runtime'
import React from 'react'
import { IdInput } from '~/components/inputs/ObjectInput'
import { getUserByUsername, getUserEmailToResend } from '~/models/user.server'
import { sendEmail } from '~/utils/emails.server'
import { badRequest, getFormEssentials } from '~/utils/forms'
import { requireUsernameToVerify } from '~/utils/session.server'

interface LoaderData {
  usernameToVerify: string
};

interface ActionData {
  msg: string
}

export const loader: LoaderFunction = async ({ request }) => {
  const usernameToVerify = await requireUsernameToVerify(request);
  return json({ usernameToVerify });
}

export const action: ActionFunction = async ({ request }) => {
  const { getFormItem } = await getFormEssentials(request);
  const usernameToVerify = getFormItem('usernameToVerify');
  const user = await getUserEmailToResend({ username: usernameToVerify });
  const token = getFormItem('token');

  if (token) {

  }
  else if (!!usernameToVerify && !!user && user.verifyEmailTriesLeft > 0) {
    await sendEmail(user.email);
    return json({ msg: "Another email sent." });
  }
  else {
    return badRequest({ msg: "Looks like you're out of verification emails." });
  }
}

export default function ComponentName() {

  const [s] = useSearchParams();
  const token = s.get('verifyToken');
  const submit = useSubmit();
  const { usernameToVerify } = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();
  const formRef = React.useRef<HTMLFormElement>(null);

  console.log(token);

  React.useEffect(() => {
    if (formRef.current) {
      submit(formRef.current);
    }
  }, []);

  return <>
    {!token || token == '' ? <>
      <p>We sent you an email to verify your address. Didn't get it?</p>
      <Form method='post'>
        <IdInput name='usernameToVerify' value={usernameToVerify} />
        <button>Re-send</button>
      </Form>
      { actionData?.msg && <p>{actionData.msg}</p> }
    </> : <Form method='post' ref={formRef}>
      <p>Welcome to verify link</p>
      <IdInput name='token' value={token} />
    </Form>}
  </>
}