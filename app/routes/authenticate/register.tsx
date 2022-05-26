import { LoaderFunction } from '@remix-run/node';
import { Form, useActionData, useSearchParams, useTransition } from '@remix-run/react';
import { ActionFunction, json } from '@remix-run/server-runtime';
import React, { useState } from 'react';
import styled from 'styled-components';
import AnglesRightIcon from '~/assets/icons/AnglesRight';
import { TextInput } from '~/components/inputs/TextInput';
import { AuthWrap, Bar, BarBack, FieldSet, FormError, PwdInfo, PwdWarn } from '~/components/other/auth-components';
import { MainButtonBtn } from '~/components/place/place-summary';
import { ErrorLabel } from '~/components/profile/account-summary';
import { styles } from '~/constants/styles';
import { checkForUserByEmail, checkForUserByPhone, checkForUserByUsername, getUserByUsername } from '~/models/user.server';
import { checkPasswordStrength, getBaseUrl, getFormEssentials, isValidEmail, isValidPhone } from '~/utils/forms';
import { createUserSession, register } from '~/utils/session.server';

export type AuthActionData = {
  formError: string | null;
  fieldErrors?: {
    username?: string | null;
    password?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    phone?: string | null;
  };
  fields?: {
    username: string | null;
    password: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phone: string | null;
  };
};

const badRequest = (data: AuthActionData) => json(data, { status: 400 });

export const loader: LoaderFunction = () => {
  return {};
}

export const action: ActionFunction = async ({ request }) => {
  
  const { getFormItem } = await getFormEssentials(request);

  // Should validate this
  const username = getFormItem('username');
  const password = getFormItem('password');
  const confirmPassword = getFormItem('confirmPassword');
  const phone = getFormItem('phone');
  const email = getFormItem('email');
  const firstName = getFormItem('firstName');
  const lastName = getFormItem('lastName');

  const existingUsername = await checkForUserByUsername({ username });
  const existingEmail = await checkForUserByEmail({ email });
  const existingPhone = await checkForUserByPhone({ phone });

  // Errors:
  /*
    1. username - already exists, too short, too long, cant be empty
    2. password - dont match, too short, cant be empty
    3. first name - cant be empty
    4. last name - cant be empty
    5. email - already exists, cant be empty, cant be invalid
    6. phone - already exists, cant be empty, cant be invalid
  */

  const fields = {
    username: username ?? '',
    password: password ?? '',
    firstName: firstName ?? '',
    lastName: lastName ?? '',
    email: email ?? '',
    phone: phone ?? ''
  }

  const usernameError = (
    username == null || username.length == 0 ? 'Please set a username' :
    !!existingUsername ? 'This username is already taken.' :
    username.length < 4 ? 'Your username has to be at least 4 characters long' :
    username.length > 16 ? 'Your username has to be at most 16 characters long' : null
  );

  const passwordError = (
    password !== confirmPassword ? `Your passwords don't match.` : 
    password == null || password.length == 0 ? 'Please choose a password' :
    password.length < 6 ? 'Your password must have at least 6 characters' : null  
  );

  const lastNameError = (
    firstName == null || lastName == null ? 'You must provide your first and last names' : null
  )

  const emailError = (
    email == null || email.length == 0 ? 'Email cannot be empty' : 
    !isValidEmail(email) ? 'This email address is invalid' : 
    !!existingEmail ? 'This email address is already registered' : null
  )

  const phoneError = (
    phone == null || phone.length == 0 ? 'Phone number cannot be empty' : 
    !isValidPhone(phone) ? 'This phone number is invalid' : 
    !!existingPhone ? 'This phone number is already registered' : null
  )

  if (usernameError || passwordError || lastNameError || emailError || phoneError) {
    return badRequest({ fields, formError: 'Please check your details', fieldErrors: {
      username: usernameError,
      password: passwordError,
      lastName: lastNameError,
      email: emailError,
      phone: phoneError
    } });
  }

  const { userId, admin } = await register({
    username,
    password,
    phone,
    email,
    firstName,
    lastName,
  }) ?? { userId: null, admin: false };

  return createUserSession(username, admin, false, '/verifyEmail');
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

export default function RegisterComponent() {

  const [searchParams, setSearchParams ] = useSearchParams();
  const { fields, fieldErrors, formError } = useActionData<AuthActionData>() ?? { fieldErrors: {}, fields: {} };
  const t = useTransition();

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
      <TextInput style={{ marginBottom: '1rem' }} title={'Username'} name='username' defaultValue={fields?.username ?? ''} />
      { fieldErrors?.username && <FormError>{fieldErrors.username}</FormError> }
      <TextInput style={{ marginBottom: '1rem' }}setValue={setPwd} title={'Password'} password={true} name='password' defaultValue={fields?.password ?? ''} />
      <TextInput style={{ marginBottom: '1rem' }}setValue={setCPwd} title={'Confirm Password'} password={true} name='confirmPassword' defaultValue={''} />
      { fieldErrors?.password && <FormError>{fieldErrors.password}</FormError> }
      <BarBack style={{ marginBottom: '0.5rem' }}><Bar width={s / 12 * 100}></Bar></BarBack>
      { s > 0 && pwd == cpwd && <PwdInfo style={{ marginBottom: '1rem' }}>Your password is <strong>{pwdString}</strong></PwdInfo> }
      { pwd.length == 0 && cpwd.length == 0 && <PwdInfo style={{ marginBottom: '1rem' }}>Choose a strong password.</PwdInfo> }
      { pwd != cpwd && <PwdWarn style={{ marginBottom: '1rem' }}>Your passwords don't match.</PwdWarn> }
      <TextInput style={{ marginBottom: '1rem' }} title={'First Name'} name='firstName' defaultValue={fields?.firstName ?? ''} />
      <TextInput style={{ marginBottom: '1rem' }} title={'Last Name'} name='lastName' defaultValue={fields?.lastName ?? ''} />
      { fieldErrors?.lastName && <FormError>{fieldErrors.lastName}</FormError> }
      <RelativeWrap style={{ marginBottom: '1rem' }}>
        <TextInput setValue={(s) => {setValidEmail(isValidEmail(s))}} title={'Email'} name='email' defaultValue={fields?.email ?? ''} />
        { !validEmail && <ErrorLabel>Invalid email</ErrorLabel> }
      </RelativeWrap>
      { fieldErrors?.email && <FormError>{fieldErrors.email}</FormError> }
      <RelativeWrap style={{ marginBottom: '1rem' }}>
        <TextInput setValue={(s) => {setValidPhone(isValidPhone(s))}} title={'Phone Number'} name='phone' defaultValue={fields?.phone ?? ''} />
        { !validPhone && <ErrorLabel>Invalid phone</ErrorLabel> }
      </RelativeWrap>
      { fieldErrors?.phone && <FormError>{fieldErrors.phone}</FormError> }
      <ConditionsText style={{ marginBottom: '1rem' }}>By creating an account, you agree with us sending you necessary email corespondence. (Password resets, confirmation emails, etc.)</ConditionsText>
      <ConditionsText style={{ marginBottom: '1rem' }}>Your details (name, email, phone) may be shared with those places where you make reservations.</ConditionsText>
      <CheckboxLabel style={{ marginBottom: '1rem' }}><input type='checkbox' checked={agree} onChange={(e) => {setAgree(e.currentTarget.checked)}} />I agree with the above terms.</CheckboxLabel>
      { formError && <FormError>{formError}</FormError> }
      <MainButtonBtn style={{ marginBottom: '1rem' }} disabled={
        !validEmail || !validPhone || !agree
      } onClick={(e) => {
        if (!validEmail || !validPhone) {
          e.preventDefault();
        }
      }}>Create Account<AnglesRightIcon height={'1.5rem'} /></MainButtonBtn>
    </FieldSet>
  </Form>
</AuthWrap>
}