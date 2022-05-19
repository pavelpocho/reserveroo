import { Form, useActionData, useSearchParams, useSubmit } from '@remix-run/react'
import { ActionFunction, json, LoaderFunction, redirect } from '@remix-run/server-runtime'
import React from 'react'
import { IdInput } from '~/components/inputs/ObjectInput'
import { TextInput } from '~/components/inputs/TextInput'
import { changeUserPassword, getEmailFromUsername } from '~/models/user.server'
import { sendPwdResetEmail } from '~/utils/emails.server'
import { badRequest, getBaseUrl, getFormEssentials } from '~/utils/forms'
import { generateHashAndSalt } from '~/utils/pwd_helper.server'
import { verifyMessage } from '~/utils/signing.server'

interface ActionData {
  msg: string;
  fields?: {
    username?: string | null
  }
}

export const action: ActionFunction = async ({ request }) => {
  const { getFormItem } = await getFormEssentials(request);
  const username = getFormItem('token').split(':')[0];
  const signature = getFormItem('token').split(':')[1];
  const password = getFormItem('password');

  const goodSource = verifyMessage(username, signature);
  if (!goodSource) {
    return json({ msg: 'Something went wrong. Are you a sneaky hacker? >:(' });
  }
  
  const passwordHash = await generateHashAndSalt(password);
  const user = await changeUserPassword({ username, passwordHash });

  return redirect('/authenticate');

}

export const loader: LoaderFunction = async ({ request }) => {
  return {};
}

export default function ForgotPassword() {

  const a = useActionData<ActionData>();
  const [ searchParams ] = useSearchParams();

  const token = searchParams.get('token');

  const formRef = React.useRef<HTMLFormElement>(null);

  return <div>
    <p>Enter your new password.</p>
    {token && <Form method='post' ref={formRef}>
      {a?.msg && <p>{a?.msg}</p>}
      <IdInput name='token' value={token} />
      <TextInput password={true} title='New Password' name='password' />
      <button>Set new password</button>
    </Form> }
  </div>
}