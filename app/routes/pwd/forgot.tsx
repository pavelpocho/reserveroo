import { Form, useActionData } from '@remix-run/react'
import { ActionFunction, json, LoaderFunction } from '@remix-run/server-runtime'
import { TextInput } from '~/components/inputs/TextInput'
import { getEmailFromUsername } from '~/models/user.server'
import { sendPwdResetEmail } from '~/utils/emails.server'
import { badRequest, getBaseUrl, getFormEssentials } from '~/utils/forms'

interface ActionData {
  msg: string;
  fields?: {
    username?: string | null
  }
}

export const action: ActionFunction = async ({ request }) => {
  const { getFormItem } = await getFormEssentials(request);
  const username = getFormItem('username');

  const user = await getEmailFromUsername({ username });

  if (user == null) return badRequest({ msg: "Something went wrong.", fields: { username: username } });

  console.log(user);

  await sendPwdResetEmail(user?.email, getBaseUrl(request), username);

  return json({ msg: "You should get an email with the reset link.", fields: { username: username } });
}

export const loader: LoaderFunction = async ({ request }) => {
  return {};
}

export default function ForgotPassword() {

  const a = useActionData<ActionData>();

  return <div>
    <p>Put in your username, we will send you a link to reset your password</p>
    <Form method='post'>
      {a?.msg && <p>{a?.msg}</p>}
      <TextInput name='username' title='Username' defaultValue={a?.fields?.username ?? ''} />
      <button>Reset password</button>
    </Form>
  </div>
}