import { ActionFunction, json } from '@remix-run/node';
import { useActionData, useLoaderData } from '@remix-run/react';
import { LoaderFunction, redirect } from '@remix-run/server-runtime'
import { AccountSummary } from '~/components/profile/account-summary'
import { checkForUserByEmail, checkForUserByPhone, checkForUserByUsername, getUserByUsername, updateUser } from '~/models/user.server';
import { getFormEssentials, isValidEmail, isValidPhone } from '~/utils/forms';
import { requireUsernameAndAdmin } from '~/utils/session.server';
import { ProfileLoaderData } from '../profile';

export type AuthActionData = {
  formError: string | null;
  fieldErrors?: {
    username?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    phone?: string | null;
  };
  fields?: {
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phone: string | null;
  };
};


export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserByUsername({ username: (await requireUsernameAndAdmin(request)).username });
  if (user) {
    user.passwordHash = '';
  }
  return { user: user };
}

const badRequest = (data: AuthActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const { getFormItem } = await getFormEssentials(request);

  const id = getFormItem('id');
  const firstName = getFormItem('firstName');
  const lastName = getFormItem('lastName');
  const username = getFormItem('username');
  const email = getFormItem('email');
  const phone = getFormItem('phone');

  // const dcCheck = [await checkForUserByEmail({ email }), await checkForUserByEmail({ username })];
  // for (let i = 0; i < dcCheck.length; i++) {
  //   if (dcCheck[i] != null && dcCheck[i]?.id != id) return {};
  // }

  const fields = {
    username: username ?? '',
    firstName: firstName ?? '',
    lastName: lastName ?? '',
    email: email ?? '',
    phone: phone ?? ''
  }

  const un = await checkForUserByUsername({ username });
  const ee = await checkForUserByEmail({ email });
  const ep = await checkForUserByPhone({ phone });
  
  const existingUsername: boolean = un != null && un.id != id;
  const existingEmail: boolean = ee != null && ee.id != id;
  const existingPhone: boolean = ep != null && ep.id != id;

  const usernameError = (
    username == null || username.length == 0 ? 'Please set a username' :
    !!existingUsername ? 'This username is already taken.' :
    username.length < 4 ? 'Your username has to be at least 4 characters long' :
    username.length > 16 ? 'Your username has to be at most 16 characters long' : null
  );

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
  
  const lastNameError = (
    firstName == null || firstName == '' || lastName == null || lastName == '' ? 'You must provide your first and last names' : null
  )

  if (usernameError || lastNameError || emailError || phoneError) {
    return badRequest({ fields, formError: 'Please check your details', fieldErrors: {
      username: usernameError,
      lastName: lastNameError,
      email: emailError,
      phone: phoneError
    } });
  }


  if (id && firstName && lastName && username && email && phone) {
    await updateUser({
      id, firstName, lastName, username, email, phone
    });
    return redirect('/profile');
  }

  return {};
}

export default function ProfileEdit() {

  const { user } = useLoaderData<ProfileLoaderData>();

  const a = useActionData<AuthActionData>();

  return <AccountSummary fieldErrors={a?.fieldErrors} formError={a?.formError ?? null} fields={a?.fields} editing={true} user={user ?? null} />
}