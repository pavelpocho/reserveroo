import { Form, useActionData, useSearchParams, useSubmit } from '@remix-run/react'
import { ActionFunction, json, LoaderFunction, redirect } from '@remix-run/server-runtime'
import { useRef, useState } from 'react'
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
import { AuthWrap, Bar, BarBack, FormError, PwdInfo, PwdWarn, Text, Title } from '~/components/other/auth-components'
import { ConfirmationDialog } from '~/components/confirmation-dialog'

interface ActionData {
  msg: string | null;
  fields: {
    password: string | null
  },
  fieldErrors: {
    password: string | null
  }
}

const badRequest = (data: ActionData) => json(data, { status: 200 });

export const action: ActionFunction = async ({ request }) => {
  const { getFormItem } = await getFormEssentials(request);
  const email = getFormItem('token').split(':')[0];
  const signature = getFormItem('token').split(':')[1];
  const password = getFormItem('password');
  const confirmPassword = getFormItem('confirmPassword');

  const passwordError = (
    password !== confirmPassword ? `Your passwords don't match.` : 
    password == null || password.length == 0 ? 'Please choose a password' :
    password.length < 6 ? 'Your password must have at least 6 characters' : null  
  );

  const goodSource = verifyMessage(email, signature);
  if (!goodSource) {
    return badRequest({
      fields: { password },
      msg: 'The link appears to be invalid. Please try resetting your password again.',
      fieldErrors: {
        password: null
      }
    })
  }

  if (passwordError) {
    return badRequest({
      fields: { password },
      msg: null,
      fieldErrors: {
        password: passwordError
      }
    })
  }
  
  const passwordHash = await generateHashAndSalt(password);
  await changeUserPassword({ email, passwordHash });

  return redirect('/authenticate/login');

}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');
  const user = await getUsernameAndAdmin(request);
  if (user.username) {
    return redirect('/places');
  }
  if (!token || token == '') {
    return redirect('/authenticate/login');
  }
  return {};
}

const InputWrap = styled.div`
  padding: 0 1rem;
`;

const Spacer = styled.div`
  height: 1rem;
`;

export default function ResetPassword() {

  const a = useActionData<ActionData>();
  const [ searchParams ] = useSearchParams();
  const submit = useSubmit();
  const ref = useRef<HTMLFormElement>(null);

  const [ pwd, setPwd ] = useState('');
  const [ cpwd, setCPwd ] = useState('');
  const [ confirmDialog, setConfirmDialog ] = useState(false);

  const s = Math.max(checkPasswordStrength(pwd), checkPasswordStrength(cpwd));

  const pwdString = (
    s <= 3 ? 'Very weak' : s <= 6 ? 'Weak' : s <= 9 ? 'Moderate' :
    s < 12 ? 'Strong' : 'Very Strong'
  )

  const token = searchParams.get('token') ?? '';

  return <div>
    {token && <>
      <ConfirmationDialog hidden={!confirmDialog} onConfirm={() => {
        if (ref.current) {
          submit(ref.current);
        }
      }} title={'Good to go?'} text={'Confirm to reset your password.'} confirmText={'Confirm'} cancelText={'Cancel'} close={() => {
        setConfirmDialog(false);
      }} />
      <Title>Password Reset - Step 2</Title>
      <IconRow invertColors={true} />
      <AuthWrap style={{ paddingBottom: '2rem' }}>
        <Text>Enter your new password below.</Text>
        <Spacer />
        <Form method='post' action={`/pwd/reset?token=${encodeURI(token)}`} ref={ref}>
          {a?.msg && <p>{a?.msg}</p>}
          <IdInput name='token' value={token} />
          <InputWrap>
            <TextInput setValue={setPwd} title={'Password'} password={true} name='password' defaultValue={''} />
            <Spacer />
            { a?.fieldErrors?.password && <FormError>{a.fieldErrors.password}</FormError> }
            <TextInput setValue={setCPwd} title={'Confirm Password'} password={true} name='confirmPassword' defaultValue={''} />
            <Spacer />
            <BarBack><Bar width={s / 12 * 100}></Bar></BarBack>
            <Spacer />
            { s > 0 && pwd == cpwd && <PwdInfo>Your password is <strong>{pwdString}</strong></PwdInfo> }
            { pwd.length == 0 && cpwd.length == 0 && <PwdInfo>Choose a strong password.</PwdInfo> }
            { pwd != cpwd && <PwdWarn>Your passwords don't match.</PwdWarn> }
          </InputWrap>
          { a?.msg && <FormError>{a.msg}</FormError> }
          <MainButtonBtn disabled={pwd != cpwd} style={{ margin: '1.5rem auto 0' }} onClick={(e) => {
            e.preventDefault();
            setConfirmDialog(true);
          }}>Reset Password<FaAngleDoubleRight /></MainButtonBtn>
        </Form>
      </AuthWrap>
    </>}
  </div>
}