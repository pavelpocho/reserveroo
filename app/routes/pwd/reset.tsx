import { Form, useActionData, useSearchParams } from '@remix-run/react'
import { ActionFunction, json, LoaderFunction, redirect } from '@remix-run/server-runtime'
import { useState } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
import styled from 'styled-components'
import { IconRow } from '~/components/icon-row'
import { IdInput } from '~/components/inputs/ObjectInput'
import { TextInput } from '~/components/inputs/TextInput'
import { MainButtonBtn } from '~/components/place/place-summary'
import { changeUserPassword } from '~/models/user.server'
import { checkPasswordStrength, getFormEssentials } from '~/utils/forms'
import { generateHashAndSalt } from '~/utils/pwd_helper.server'
import { getUsernameAndAdmin } from '~/utils/session.server'
import { verifyMessage } from '~/utils/signing.server'
import { AuthWrap, Bar, BarBack, PwdInfo, PwdWarn, Text, Title } from '~/components/other/auth-components'

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
  const url = new URL(request.url);
  const token = url.searchParams.get('token');
  const user = await getUsernameAndAdmin(request);
  if (user.username) {
    return redirect('/places');
  }
  if (!token || token == '') {
    return redirect('/authenticate');
  }
  return {};
}

const InputWrap = styled.div`
  padding: 0 1rem;
`;

const Spacer = styled.div`
  height: 1rem;
`;

export default function ForgotPassword() {

  const a = useActionData<ActionData>();
  const [ searchParams ] = useSearchParams();

  const [ pwd, setPwd ] = useState('');
  const [ cpwd, setCPwd ] = useState('');

  const s = Math.max(checkPasswordStrength(pwd), checkPasswordStrength(cpwd));

  const pwdString = (
    s <= 3 ? 'Very weak' : s <= 6 ? 'Weak' : s <= 9 ? 'Moderate' :
    s < 12 ? 'Strong' : 'Very Strong'
  )

  const token = searchParams.get('token') ?? '';

  return <div>
    {token && <>
      <Title>Password Reset - Step 2</Title>
      <IconRow invertColors={true} />
      <AuthWrap style={{ paddingBottom: '2rem' }}>
        <Text>Enter your new password below.</Text>
        <Spacer />
        <Form method='post'>
          {a?.msg && <p>{a?.msg}</p>}
          <IdInput name='token' value={token} />
          <InputWrap>
            <TextInput setValue={setPwd} title={'Password'} password={true} name='password' defaultValue={''} />
            <Spacer />
            <TextInput setValue={setCPwd} title={'Confirm Password'} password={true} name='confirmPassword' defaultValue={''} />
            <Spacer />
            <BarBack><Bar width={s / 12 * 100}></Bar></BarBack>
            <Spacer />
            { s > 0 && pwd == cpwd && <PwdInfo>Your password is <strong>{pwdString}</strong></PwdInfo> }
            { pwd.length == 0 && cpwd.length == 0 && <PwdInfo>Choose a strong password.</PwdInfo> }
            { pwd != cpwd && <PwdWarn>Your passwords don't match.</PwdWarn> }
          </InputWrap>
          <MainButtonBtn disabled={pwd != cpwd} style={{ margin: '1.5rem auto 0' }}>Reset Password<FaAngleDoubleRight /></MainButtonBtn>
        </Form>
      </AuthWrap>
    </>}
  </div>
}