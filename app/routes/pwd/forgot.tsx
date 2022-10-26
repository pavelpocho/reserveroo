import { redirect } from '@remix-run/node'
import { Form, useActionData, useSubmit } from '@remix-run/react'
import { ActionFunction, json, LoaderFunction } from '@remix-run/server-runtime'
import { FaAngleDoubleRight } from 'react-icons/fa'
import styled from 'styled-components'
import { IconRow } from '~/components/icon-row'
import { TextInput } from '~/components/inputs/TextInput'
import { AuthWrap, FormError, Title } from '~/components/other/auth-components'
import { MainButtonBtn } from '~/components/place/place-summary'
import { checkForUserByEmail, getEmailFromUsername } from '~/models/user.server'
import { sendPwdResetEmail } from '~/utils/emails.server'
import { badRequest, getBaseUrl, getFormEssentials } from '~/utils/forms'
import { getUsernameAndAdmin } from '~/utils/session.server'
import { Text } from '~/components/other/auth-components'
import { styles } from '~/constants/styles'
import { useRef, useState } from 'react'

interface ActionData {
  msg?: string;
  goodMsg?: string;
  fields?: {
    email?: string | null
  }
}

export const action: ActionFunction = async ({ request }) => {
  const { getFormItem } = await getFormEssentials(request);
  const email = getFormItem('email');

  const user = await checkForUserByEmail({ email });

  if (user == null) return badRequest({ msg: "Email not found", fields: { email } });

  await sendPwdResetEmail(user?.email, getBaseUrl(request), email);

  return json({ goodMsg: "Okay! Check your inbox.", fields: { email } });
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUsernameAndAdmin(request);
  if (user.username) {
    return redirect('/places');
  }
  return {};
}

const InputWrap = styled.div`
  padding: 0 1rem;
`;

export default function ForgotPassword() {

  const a = useActionData<ActionData>();
  const [ disable, setDisable ] = useState(false);
  const submit = useSubmit();
  const ref = useRef<HTMLFormElement>(null);

  return <div>
    <Title>Password Reset - Step 1</Title>
    <IconRow invertColors={true} />
    <AuthWrap style={{ paddingBottom: '2rem' }}>
      <Text>Enter your email. If you have an account, we will send you a password recovery link.</Text>
      <Form method='post' ref={ref}>
        <div style={{ margin: '0 1rem' }}>
          {a?.msg && <FormError>{a?.msg}</FormError>}
        </div>
        <InputWrap style={{ marginBottom: '1rem' }}>
          <TextInput name='email' title='Email' defaultValue={a?.fields?.email ?? ''} setValue={() => {
            setDisable(false);
          }} />
        </InputWrap>
        <div style={{ margin: '0 1rem' }}>
          {a?.goodMsg && <FormError style={{ color: styles.colors.primary }}>{a?.goodMsg}</FormError>}
        </div>
        <MainButtonBtn disabled={disable} style={{ margin: '0 auto' }} onClick={() => {
          setDisable(true);
          if (ref.current) {
            submit(ref.current, { replace: true });
          }
        }}>Reset Password<FaAngleDoubleRight /></MainButtonBtn>
      </Form>
    </AuthWrap>
  </div>
}