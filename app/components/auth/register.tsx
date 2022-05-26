import { Form } from "@remix-run/react"
import { Transition } from "@remix-run/react/transition"
import React, { useState } from "react"
import styled from "styled-components"
import AnglesRightIcon from "~/assets/icons/AnglesRight"
import { styles } from "~/constants/styles"
import { AuthActionData } from "~/routes/authenticate/login"
import { checkPasswordStrength, isValidEmail, isValidPhone } from "~/utils/forms"
import { TextInput } from "../inputs/TextInput"
import { AuthWrap, FieldSet, BarBack, Bar, PwdInfo, PwdWarn } from "../other/auth-components"
import { MainButtonBtn } from "../place/place-summary"
import { ErrorLabel } from "../profile/account-summary"

interface Props {
  a?: AuthActionData,
  searchParams: URLSearchParams,
  setSearchParams: (data: string) => void,
  t: Transition
}


const ConditionsText = styled.p`
  margin: 0;
  color: ${styles.colors.black};
  font-size: 0.8125rem;
`;

const RelativeWrap = styled.div`
  position: relative;
`;

const CheckboxLabel = styled.label`
  font-size: 0.875rem;
  display: flex;
  gap: 0.5rem;
`;

export const RegisterComponent: React.FC<Props> = ({ a, searchParams, setSearchParams, t }) => {

  React.useEffect(() => {
    if (a?.fields?.redirectTo) {
      setSearchParams(a?.fields?.redirectTo);
    }
  }, [a?.fields?.redirectTo]);

  const [ pwd, setPwd ] = useState('');
  const [ cpwd, setCPwd ] = useState('');
  const [ agree, setAgree ] = useState(false);

  const s = Math.max(checkPasswordStrength(pwd), checkPasswordStrength(cpwd));

  const pwdString = (
    s <= 3 ? 'Very weak' : s <= 6 ? 'Weak' : s <= 9 ? 'Moderate' :
    s < 12 ? 'Strong' : 'Very Strong'
  )

  const [ validEmail, setValidEmail ] = useState(true);
  const [ validPhone, setValidPhone ] = useState(true);

  return <AuthWrap>
  <Form method='post' action='/authenticate/register'>
    <FieldSet disabled={t.state === 'submitting'}>
      <input hidden={true} name='redirectTo' defaultValue={searchParams.get('redirectTo') ?? undefined} />
      <TextInput title={'Username'} name='username' defaultValue={a?.fields?.username ?? ''} />
      <TextInput setValue={setPwd} title={'Password'} password={true} name='password' defaultValue={a?.fields?.password ?? ''} />
      <TextInput setValue={setCPwd} title={'Confirm Password'} password={true} name='confirmPassword' defaultValue={a?.fields?.password ?? ''} />
      <BarBack><Bar width={s / 12 * 100}></Bar></BarBack>
      { s > 0 && pwd == cpwd && <PwdInfo>Your password is <strong>{pwdString}</strong></PwdInfo> }
      { pwd.length == 0 && cpwd.length == 0 && <PwdInfo>Choose a strong password.</PwdInfo> }
      { pwd != cpwd && <PwdWarn>Your passwords don't match.</PwdWarn> }
      <TextInput title={'First Name'} name='firstName' defaultValue={a?.fields?.firstName ?? ''} />
      <TextInput title={'Last Name'} name='lastName' defaultValue={a?.fields?.lastName ?? ''} />
      <RelativeWrap>
        <TextInput setValue={(s) => {setValidEmail(isValidEmail(s))}} title={'Email'} name='email' defaultValue={a?.fields?.email ?? ''} />
        { !validEmail && <ErrorLabel>Invalid email</ErrorLabel> }
      </RelativeWrap>
      <RelativeWrap>
        <TextInput setValue={(s) => {setValidPhone(isValidPhone(s))}} title={'Phone Number'} name='phone' defaultValue={a?.fields?.phone ?? ''} />
        { !validPhone && <ErrorLabel>Invalid phone</ErrorLabel> }
      </RelativeWrap>
      <ConditionsText>By creating an account, you agree with us sending you necessary email corespondence. (Password resets, confirmation emails, etc.)</ConditionsText>
      <ConditionsText>Your details (name, email, phone) may be shared with those places where you make reservations.</ConditionsText>
      <CheckboxLabel><input type='checkbox' checked={agree} onClick={(e) => {setAgree(e.currentTarget.checked)}} />I agree with the above terms.</CheckboxLabel>
      <MainButtonBtn disabled={!validEmail || !validPhone || !agree} onClick={(e) => {
        if (!validEmail || !validPhone) {
          e.preventDefault();
        }
      }}>Create Account<AnglesRightIcon height={'1.5rem'} /></MainButtonBtn>
      { a && a.formError && <p>
        {a.formError}
      </p> }
    </FieldSet>
  </Form>
</AuthWrap>
}